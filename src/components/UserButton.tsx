
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const UserButton = () => {
  const { currentUser, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: "Signed out successfully" });
    } catch (error) {
      toast({ 
        title: "Error signing out", 
        variant: "destructive" 
      });
    }
  };

  if (!currentUser) {
    return (
      <>
        <Button onClick={() => setShowAuthModal(true)} variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{currentUser.displayName || currentUser.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
