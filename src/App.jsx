import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";
import EnhanceResearch from "./pages/EnhanceResearch.jsx";
import GenerateContent from "./pages/GenerateContent.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PromptStudio from "./pages/PromptStudio.jsx";
import CommercialOffers from "./pages/CommercialOffers.jsx";
import SalesPipeline from "./pages/SalesPipeline.jsx";
import ActivityPlanner from "./pages/ActivityPlanner.jsx";
import FeeBenchmark from "./pages/FeeBenchmark.jsx";
import WorkflowAutomation from "./pages/WorkflowAutomation.jsx";
import MobileQuickActions from "./pages/MobileQuickActions.jsx";
import TemplateDesigner from "./pages/TemplateDesigner.jsx";
import CRMContacts from "./pages/CRMContacts.jsx";
import ProposalBuilder from "./pages/ProposalBuilder.jsx";
import FeeCalculator from "./pages/FeeCalculator.jsx";
import EmailCampaigns from "./pages/EmailCampaigns.jsx";
import ClientPortal from "./pages/ClientPortal.jsx";
import Integrations from "./pages/Integrations.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/knowledge" replace />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/enhance" element={<EnhanceResearch />} />
        <Route path="/generate" element={<GenerateContent />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/prompt-studio" element={<PromptStudio />} />
        <Route path="/offers" element={<CommercialOffers />} />
        <Route path="/pipeline" element={<SalesPipeline />} />
        <Route path="/activities" element={<ActivityPlanner />} />
        <Route path="/fee-benchmark" element={<FeeBenchmark />} />
        <Route path="/workflow" element={<WorkflowAutomation />} />
        <Route path="/mobile" element={<MobileQuickActions />} />
        <Route path="/template-designer" element={<TemplateDesigner />} />
        <Route path="/crm" element={<CRMContacts />} />
        <Route path="/proposal-builder" element={<ProposalBuilder />} />
        <Route path="/fee-calculator" element={<FeeCalculator />} />
        <Route path="/email-campaigns" element={<EmailCampaigns />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="*" element={<Navigate to="/knowledge" replace />} />
      </Route>
    </Routes>
  );
}
