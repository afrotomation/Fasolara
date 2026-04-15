"use client";

import { ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const uri =
  process.env.NEXT_PUBLIC_CLIENT_URI ||
  process.env.NEXT_PUBLIC_CLIENT_DEV ||
  "http://localhost:4000/api";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

/**
 * Default export wraps the app in ApolloProvider. Consumed by
 * `app/layout.tsx` as `<Providers>...</Providers>`.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
