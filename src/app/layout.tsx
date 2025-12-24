import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Lendsqr Admin",
  description: "Lendsqr Admin | Manage your lending platform users and data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
