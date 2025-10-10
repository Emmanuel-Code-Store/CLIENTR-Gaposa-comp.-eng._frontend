"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Image from "next/image";
import ElectionHeader from "@/components/ElectionHeader";
import ElectionFooter from "@/components/ElectionFooter";

export default function AboutElection() {
  return (
    <Box component="main" sx={{ bgcolor: "#f9f9f9" }}>
      <ElectionHeader />

      {/* Hero Section */}
      <Box
        sx={{
          pt: 24,
          pb: 8,
          backgroundImage: "linear-gradient(to right, #6366f1, #ec4899)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", fontSize: { xs: "3rem", md: "4rem" }, mb: 2 }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", mx: "auto", fontSize: "1.1rem" }}
          >
            Learn how to vote, where to vote, what you&apos;ll be voting on, and more.
            We are committed to making elections simple, transparent, and fair.
          </Typography>
        </Container>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          height: 12,
          width: "80%",
          mx: "auto",
          my: 8,
          background: "linear-gradient(to right, #8B5CF6, #EC4899)",
          borderRadius: "9999px",
        }}
      />

      {/* Registrar Card */}
      <Container sx={{ mb: 10 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: 4,
            boxShadow: 6,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          {/* Content */}
          <CardContent sx={{ flex: 1, pr: { md: 6 }, pb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, color: "#1a237e" }}
            >
              Mr. Sodiq — Registrar of Voters
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.8 }}
            >
              Mr. Sodiq leads the initiative to ensure all students and community members
              are registered and accredited in time for every election. He believes in the
              power of informed decision-making, accessibility, and fairness. Under his
              leadership, the voter registration system has become more robust and
              inclusive than ever before. His commitment ensures that every voice is heard,
              and every vote counts. Whether you&apos;re new to the process or a returning voter,
              Mr. Sodiq and the team are here to support your journey to civic participation.
            </Typography>
          </CardContent>

          {/* Image */}
          <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <Image
              src="/images/election_registrar.avif" 
              alt="Registrar of Voters"
              width={300}
              height={300}
              style={{ borderRadius: "16px", objectFit: "cover" }}
            />
          </Box>
        </Card>
      </Container>

      {/* Divider */}
      <Divider
        sx={{
          height: 12,
          width: "80%",
          mx: "auto",
          my: 8,
          background: "linear-gradient(to right, #8B5CF6, #EC4899)",
          borderRadius: "9999px",
        }}
      />

      <ElectionFooter />
    </Box>
  );
}
