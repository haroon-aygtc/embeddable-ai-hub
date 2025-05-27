
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import AIModels from './pages/AIModels';
import WidgetPage from './pages/WidgetPage';
import KnowledgeBase from './pages/KnowledgeBase';
import PromptTemplates from './pages/PromptTemplates';
import ChatManagement from './pages/ChatManagement';
import UserManagement from './pages/UserManagement';
import RolesPermissions from './pages/RolesPermissions';
import BrandingManager from './pages/BrandingManager';
import MultiTenantManager from './pages/MultiTenantManager';
import SystemSettings from './pages/SystemSettings';
import FollowUpManager from './pages/FollowUpManager';
import CreateEditRole from './pages/CreateEditRole';
import CreateEditUser from './pages/CreateEditUser';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Index from './pages/Index';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<AppLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-models" element={<AIModels />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/prompts" element={<PromptTemplates />} />
        <Route path="/chats" element={<ChatManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateEditUser />} />
        <Route path="/users/edit/:id" element={<CreateEditUser />} />
        <Route path="/roles" element={<RolesPermissions />} />
        <Route path="/roles/create" element={<CreateEditRole />} />
        <Route path="/roles/edit/:id" element={<CreateEditRole />} />
        <Route path="/branding" element={<BrandingManager />} />
        <Route path="/tenants" element={<MultiTenantManager />} />
        <Route path="/settings" element={<SystemSettings />} />
        
        {/* Follow-Up Manager Routes */}
        <Route path="/follow-ups" element={<FollowUpManager />} />
        <Route path="/follow-ups/:id" element={<FollowUpManager />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
