import axios from "axios";

const OPENAI_BASE = "https://api.openai.com/v1";

const EmbeddingService = {
  // ----------------------------------------
  // 1) Generate Embeddings
  // ----------------------------------------
  embedText: async (text: string): Promise<number[]> => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        console.warn("No OpenAI key — embeddings disabled.");
        return [];
      }

      const response = await axios.post(
        `${OPENAI_BASE}/embeddings`,
        {
          model: "text-embedding-3-small", // Best small model for vector search
          input: text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data[0].embedding;
    } catch (err: any) {
      console.error("Embedding error:", err.response?.data || err.message);
      return [];
    }
  },

  // ----------------------------------------
  // 2) Chat (LLM for book Q&A)
  // ----------------------------------------
  chat: async (message: string): Promise<string> => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return `Chat is disabled (missing API Key). You asked: ${message}`;
      }

      const response = await axios.post(
        `${OPENAI_BASE}/chat/completions`,
        {
          model: "gpt-4o-mini",   // Latest small chat model
          messages: [
            {
              role: "system",
              content: "You are a helpful book assistant. Answer concisely.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (err: any) {
      console.error("Chat error:", err.response?.data || err.message);
      return "Sorry, I couldn't process your request.";
    }
  },
};

export default EmbeddingService;
