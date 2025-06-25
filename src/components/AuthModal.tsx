
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '../contexts/NeonAuthContext';
import { toast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({ title: "Welcome back!" });
      } else {
        await register(email, password, displayName);
        toast({ title: "Account created successfully!" });
      }
      onClose();
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message,
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Sign In' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
