import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChallengesPage from "./pages/ChallengesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FeaturesPage from "./pages/FeaturesPage";
import FAQPage from "./pages/FAQPage";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import TradingRulesPage from "./pages/TradingRulesPage";
import ScalingPlanPage from "./pages/ScalingPlanPage";
import TradingObjectivesPage from "./pages/TradingObjectivesPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AcademyPage from "./pages/AcademyPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import CareersPage from "./pages/CareersPage";
import LegalPage from "./pages/LegalPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import TradesPage from "./pages/TradesPage";
import WalletPage from "./pages/WalletPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/trading-rules" element={<TradingRulesPage />} />
              <Route path="/scaling-plan" element={<ScalingPlanPage />} />
              <Route path="/trading-objectives" element={<TradingObjectivesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/legal/:slug" element={<LegalPage />} />
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/legal/:slug" element={<LegalPage />} />
              <Route path="/loyalty" element={<LoyaltyPage />} />
              <Route path="/trades" element={<TradesPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
