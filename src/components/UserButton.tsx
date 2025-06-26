
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

  const handleSignInClick = () => {
    console.log('Sign in button clicked');
    setShowAuthModal(true);
  };

  if (!currentUser) {
    return (
      <>
        <Button onClick={handleSignInClick} variant="outline" size="sm" className="hover:bg-gray-50">
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
        <Button variant="outline" size="sm" className="flex items-center space-x-2 hover:bg-gray-50">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{currentUser.displayName || currentUser.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200">
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-50">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
