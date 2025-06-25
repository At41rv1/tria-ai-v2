
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HybridAuthProvider } from "./contexts/HybridAuthContext";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import StudyChat from "./pages/StudyChat";
import Settings from "./pages/Settings";
import ChatSelector from "./components/ChatSelector";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HybridAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat-selector" element={<ChatSelector />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/study-chat" element={<StudyChat />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HybridAuthProvider>
  </QueryClientProvider>
);

export default App;
