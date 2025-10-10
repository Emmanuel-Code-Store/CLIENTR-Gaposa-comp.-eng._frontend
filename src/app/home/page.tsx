'use client';
import React from "react";
import {Box} from "@mui/material";

import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Footer from "@/components/Footer";

const Page: React.FC = () => {

  return (
    <Box>
      <Navbar />
      <Home />
      <Footer />
    </Box>
  );
};

export default Page;
