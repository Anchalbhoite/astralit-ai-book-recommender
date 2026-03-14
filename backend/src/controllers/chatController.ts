import { Request, Response } from "express";
import Chat from "../models/Chat";
import {Book} from "../models/Book";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = await Chat.create({
        userId,
        messages: []
      });
    }

    chat.messages.push({
  role: "user",
  content: message,
  timestamp: new Date()
});


    await chat.save();

    // AI context
    const messagesForAI = chat.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    // Find relevant books using fuzzy matching
    const relatedBooks = await Book.find({
      $or: [
        { description: { $regex: message, $options: "i" } },
        { genre: { $regex: message, $options: "i" } },
        { title: { $regex: message, $options: "i" } }
      ]
    }).limit(4);

    const bookInfo =
      relatedBooks.length > 0
        ? relatedBooks
            .map(
              b =>
                `• **${b.title}** by ${b.author} — rating ${b.rating}/5. Genre: ${b.genre}.`
            )
            .join("\n")
        : "No direct matches in our library, but I’ll help based on your interest!";

    // AI response
    const aiResponse = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are Astra — an AI reading assistant. Help with book summaries, recommendations, genres, moods, and reading habits. Be warm, simple, and friendly."
        },
        ...messagesForAI,
        {
          role: "system",
          content: `Relevant books from the user's library:\n${bookInfo}`
        }
      ]
    });

    const reply = aiResponse.choices[0].message.content;

    chat.messages.push({
  role: "assistant",
  content: reply!,
  timestamp: new Date()
});



    await chat.save();

    res.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ message: "Chat service error", error: err });
  }
};
