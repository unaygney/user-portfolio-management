import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server";

const getBaseUrl = () => {
  // browser should use relative path
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://<YOUR_DEPLOYED_WORKER_URL>/";
};

export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
