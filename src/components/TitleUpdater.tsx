"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TitleUpdater() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("Tender Step Schools");

  useEffect(() => {
    if (pathname) {
      const section = pathname.split("/").pop() || "";
      const formattedSection = section
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setPageTitle(`Tender Step Schools | ${formattedSection}`);
    }
  }, [pathname]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return null;
}
