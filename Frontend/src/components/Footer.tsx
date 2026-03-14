import { Sparkles, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-slate-950/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-purple-400" />
              <span className="text-white">AstraLit ✨</span>
            </div>
            <p className="text-purple-300 text-sm">
              Discover the books written in your stars. AI-powered book recommendations for every reader.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="size-9 p-0 text-purple-300 hover:text-purple-200">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="size-9 p-0 text-purple-300 hover:text-purple-200">
                <Instagram className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="size-9 p-0 text-purple-300 hover:text-purple-200">
                <Github className="size-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Features</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">How it Works</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">AI Technology</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">About Us</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Blog</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Careers</a></li>
              <li><a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white">Stay Updated</h4>
            <p className="text-purple-300 text-sm">Get personalized book recommendations weekly</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
                <Mail className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-300">
          <p>&copy; 2025 AstraLit. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-purple-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-200 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}