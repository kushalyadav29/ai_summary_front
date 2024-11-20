import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'AI Summarizer',
  description: 'Summarize your text with AI!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-gold font-sans">
        <header className="p-4 bg-gold text-black text-center">
          <h1 className="text-3xl font-bold">AI Summarizer</h1>
        </header>
        <main className="min-h-screen p-6">{children}</main>
        <footer className="p-4 bg-gold text-black text-center">
          <p>© 2024 AI Summarizer. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}

