'use client';
import React from "react";
import {Box} from "@mui/material";

import Navbar from "@computerEngineering/components/Navbar";
import Home from "@computerEngineering/components/Home";
import Footer from "@computerEngineering/components/Footer";

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
