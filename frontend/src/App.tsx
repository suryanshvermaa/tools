
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FileProcessorPage from "./pages/FileProcessor";
import NotFound from "./pages/NotFound";
import MailSenderPage from "./pages/MailSender";
import EmailComposerPage from "./pages/EmailComposer";
import ClubMailPage from "./pages/ClubMail";
import EmailGenerator from "./components/EmailGenerator";
import DcumentaionPage from "./pages/Dcumentaion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/file-processor" element={<FileProcessorPage />} />
          <Route path="/mail-sender" element={<MailSenderPage />} />
          <Route path="/email-composer" element={<EmailComposerPage />} />
          <Route path="/club-mail" element={<ClubMailPage />} />
          <Route path="/email-generator" element={<EmailGenerator />} />
          <Route path="/documentation" element={<DcumentaionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
