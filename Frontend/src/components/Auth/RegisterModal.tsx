import { X, Mail, Lock, User, Sparkles, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent } from '../ui/dialog';
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - TODO: Replace with real authentication
    setTimeout(() => {
      toast.success('Account created! Welcome to AstraLit ✨');
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-950 border-purple-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-purple-400" />
              <h2 className="text-white text-2xl">Join AstraLit</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-purple-300 hover:text-purple-200"
            >
              <X className="size-5" />
            </Button>
          </div>

          <p className="text-purple-300">
            Create an account to get personalized book recommendations
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-400" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="bookworm123"
                  required
                  className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
                />
              </div>
              <p className="text-purple-400 text-xs">
                Minimum 8 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Sparkles className="size-4" />
                </motion.div>
              ) : (
                <>
                  <UserPlus className="size-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-purple-400 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>

          {/* Footer */}
          <div className="text-center text-sm">
            <span className="text-purple-300">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Log in
            </button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
