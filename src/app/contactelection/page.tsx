"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import ElectionHeader from "@/components/ElectionHeader";
import ElectionFooter from "@/components/ElectionFooter";

export default function ContactElection() {
  return (
    <Box component="main" sx={{ bgcolor: "#f9f9f9" }}>
      <ElectionHeader />

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
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, mx: "auto", color: "#fff" }}
          >
            Fill out the form below to reach out to us. You can also check our{" "}
            <Typography component="span" sx={{ color: "primary.main", fontWeight: "bold" }}>
              FAQs
            </Typography>{" "}
            for quick answers.
          </Typography>
        </Container>
      </Box>

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
      <Container sx={{ my: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Send Us a Message
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField fullWidth label="Full Name" variant="outlined" />
                <TextField fullWidth label="Email" type="email" variant="outlined" />
                <TextField fullWidth label="Enquiry Type" variant="outlined" />
                <TextField fullWidth label="Level" variant="outlined" />
                <TextField fullWidth label="Program Type" variant="outlined" />
                <TextField fullWidth label="Message" multiline rows={6} variant="outlined" />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "top",
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 0.5 }}>
                  📧 Email
                </Typography>
                <Typography variant="body1">info@gaposa.comp.eng.edu.ng</Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 0.5 }}>
                  ☎️ Phone
                </Typography>
                <Typography variant="body1">Office: +61 491 678 996</Typography>
                <Typography variant="body1">Fax: +61 491 678 996</Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 0.5 }}>
                  🏢 Office Address
                </Typography>
                <Typography variant="body1">168 N Edwards Street</Typography>
                <Typography variant="body1">Ogun State, Nigeria</Typography>
                <Typography variant="body1">West Africa</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <ElectionFooter />
    </Box>
  );
}
