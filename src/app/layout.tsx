import "./globals.css";
import "./style.css";
// import ThemeRegistry from "./dashboard/ThemeRegistry";
import TitleUpdater from "@/components/TitleUpdater";
// import { assetPath } from "@/utils/assetPath";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>${process.env.NEXT_PUBLIC_SCHOOL_NAME} | Home</title>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/logo.ico" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.ico" />
        <meta name="description" content="Developed by Emmpetech" />
      </head>
      <body className={raleway.className}>
        {/* <ThemeRegistry> */}
        <TitleUpdater />
        {children}
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}
