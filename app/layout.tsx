import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/global.css";
import { FC, ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Generator",
  description: "Generate new AI Prompt and share it or discover it",
};

const RootLayout: FC<{ children: Readonly<ReactNode> }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
