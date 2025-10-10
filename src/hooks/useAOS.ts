"use client";

import { useEffect } from "react";
import AOS from "aos";
import "@/styles/aos.css";

export function useAOS({ duration = 1000, once = true } = {}) {
  useEffect(() => {
    AOS.init({
      duration,
      once,
    });
  }, [duration, once]); 
}