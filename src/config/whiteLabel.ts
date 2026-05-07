/**
 * White-Label Provider Configuration
 * ----------------------------------
 * Funded Ox is designed to plug into any prop-firm / funded-account
 * white-label backend (e.g. Brokeret, Match-Trader, cTrader, YouTrade,
 * TradeLocker, Plexytrade, etc.).
 *
 * To connect a provider:
 *   1. Drop your provider's API base URL + public key into the values below
 *      (or set them as VITE_* env vars in a `.env` file).
 *   2. The CTAs across the site will automatically point to the provider's
 *      signup / dashboard / checkout flows.
 *   3. For server-side calls (KYC, account creation, payouts) connect Lovable
 *      Cloud and create an Edge Function that proxies to PROVIDER_API_BASE
 *      using a server-side secret.
 */

export const whiteLabel = {
  brand: {
    name: "Funded Ox",
    tagline: "Slow and steady wins the funded account.",
    supportEmail: "support@fundedox.com",
  },

  provider: {
    // Display name shown in the footer ("Powered by ...")
    name: import.meta.env.VITE_PROVIDER_NAME ?? "Your White-Label Provider",

    // REST API base for server-side calls (used inside Edge Functions)
    apiBase: import.meta.env.VITE_PROVIDER_API_BASE ?? "https://api.example-provider.com/v1",

    // Public/anon key — safe to expose in the browser
    publicKey: import.meta.env.VITE_PROVIDER_PUBLIC_KEY ?? "",

    // Customer-facing URLs from the provider's hosted flows
    signupUrl: import.meta.env.VITE_PROVIDER_SIGNUP_URL ?? "#challenges",
    loginUrl: import.meta.env.VITE_PROVIDER_LOGIN_URL ?? "#challenges",
    dashboardUrl: import.meta.env.VITE_PROVIDER_DASHBOARD_URL ?? "#challenges",
    checkoutUrl: import.meta.env.VITE_PROVIDER_CHECKOUT_URL ?? "#challenges",
  },
};

export type Challenge = {
  id: string;
  size: string;
  price: string;
  profitTarget: string;
  maxDailyLoss: string;
  maxLoss: string;
  profitSplit: string;
  popular?: boolean;
};

export const challenges: Challenge[] = [
  { id: "shellling", size: "$10K",  price: "$89",  profitTarget: "8%", maxDailyLoss: "5%", maxLoss: "10%", profitSplit: "70%" },
  { id: "snapper",   size: "$25K",  price: "$179", profitTarget: "8%", maxDailyLoss: "5%", maxLoss: "10%", profitSplit: "70%", popular: true },
  { id: "loggerhead",size: "$50K",  price: "$289", profitTarget: "8%", maxDailyLoss: "5%", maxLoss: "10%", profitSplit: "70%" },
  { id: "leatherback",size: "$100K",price: "$489", profitTarget: "8%", maxDailyLoss: "5%", maxLoss: "10%", profitSplit: "70%" },
  { id: "galapagos", size: "$200K", price: "$989", profitTarget: "8%", maxDailyLoss: "5%", maxLoss: "10%", profitSplit: "70%" },
];
