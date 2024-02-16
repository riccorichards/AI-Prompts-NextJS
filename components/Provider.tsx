"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

export interface MySession {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  expires: string;
}

const Provider: FC<{
  children: Readonly<ReactNode>;
  session?: MySession | null;
}> = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
