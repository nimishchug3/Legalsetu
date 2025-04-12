import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login'; 
import FileUpload from './components/FileUpload'; // Assuming you have a FileUpload component
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import SummarizeDocument from "./pages/SummariseDocument";
import FindLawyer from "./pages/FindLawyer";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/summarize" element={<FileUpload />} />
          <Route path="/find-lawyer" element={<FindLawyer />} />
        <Route path="/upload" element={<FileUpload />} />
          <Route path="/login" element={<LoginPage />} />
         
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
