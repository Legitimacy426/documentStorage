import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DEON PAST PAPERS",
  description: "Download past papers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="CVNFfAG5fzbGJgJ79hjTETPazsMkoaVvpW5cHe7UUd0" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
