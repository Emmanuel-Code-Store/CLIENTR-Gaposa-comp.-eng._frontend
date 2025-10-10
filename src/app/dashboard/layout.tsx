import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ThemeRegistry from "./ThemeRegistry";
import TitleUpdater from "@/components/TitleUpdater";
import "../globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Tender Step Schools | Dashboard</title> 
           <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/logo.ico" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.ico" />
        <meta name="description" content="Developed by Emmpetech" />
      </head>
      <body style={{ fontFamily: 'Raleway, sans-serif' }}>
        {/* <ThemeRegistry> */}
          <TitleUpdater />
          {children}
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}

