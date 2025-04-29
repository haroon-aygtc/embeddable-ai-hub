
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import WidgetPage from "./pages/WidgetPage";
import AIModels from "./pages/AIModels";
import ChatManagement from "./pages/ChatManagement";
import PromptTemplates from "./pages/PromptTemplates";
import KnowledgeBase from "./pages/KnowledgeBase";
import UserManagement from "./pages/UserManagement";
import FollowUpBuilder from "./pages/FollowUpBuilder";
import BrandingManager from "./pages/BrandingManager";
import SystemSettings from "./pages/SystemSettings";
import MultiTenantManager from "./pages/MultiTenantManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/widget" element={<WidgetPage />} />
          <Route path="/ai-models" element={<AIModels />} />
          <Route path="/chat" element={<ChatManagement />} />
          <Route path="/prompts" element={<PromptTemplates />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/follow-ups" element={<FollowUpBuilder />} />
          <Route path="/branding" element={<BrandingManager />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/tenants" element={<MultiTenantManager />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
