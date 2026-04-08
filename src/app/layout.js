import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Interactive Calendar | Wall Calendar Component",
  description:
    "A polished, interactive wall calendar component with date range selection, integrated notes, theme switching, and responsive design. Built with Next.js and React.",
  keywords: ["calendar", "interactive", "wall calendar", "date picker", "notes", "React", "Next.js"],
  authors: [{ name: "Divyansh Rai" }],
  openGraph: {
    title: "Interactive Calendar Component",
    description: "A beautiful wall calendar with date range selection and notes",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
