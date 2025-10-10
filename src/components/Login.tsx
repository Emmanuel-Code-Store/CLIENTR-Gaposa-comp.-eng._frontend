"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  styled,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toTrainCase } from '@/utils/helpers';

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 440,
  padding: theme.spacing(4),
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    height: 40,
    "&:hover fieldset": {
      borderColor: theme.palette.grey[300],
    },
  },
}));

interface LoginProps {
  userType: string;
}

export default function Login({ userType }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  console.log("Login: Rendering for userType:", userType);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      console.log("Login: Missing email or password");
      return;
    }

    try {
      console.log("Login: Submitting login for email:", email);
      await login(email, password);
      setEmail("");
      setPassword("");
      setShowPassword(false);
    } catch (err) {
      console.error("Login: Submission error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        p: 2,
      }}
    >
      <StyledCard>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          <Link href="/">
           <Image
              src={process.env.NEXT_PUBLIC_SCHOOL_LOGO_URL || ""}
              alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || ""} `}
              width={150}
              height={150}
              style={{ objectFit: "contain", borderRadius: '0' }}
            />
          </Link>
        </Box>

        <Stack spacing={1} sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 600, fontFamily: "Raleway, sans-serif" }}
          >
            {`${process.env.NEXT_PUBLIC_SCHOOL_NAME} ${toTrainCase(userType)}`}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Raleway, sans-serif" }}
          >
            Please enter your login details to continue.
          </Typography>
        </Stack>

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          {error && (
            <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
              {error.message}
            </Typography>
          )}

          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, fontFamily: "Raleway, sans-serif" }}
            >
              Email Address
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="Kew@example.com"
              variant="outlined"
              size="small"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!error && !email}
              helperText={!!error && !email ? "Email is required" : ""}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, fontFamily: "Raleway, sans-serif" }}
            >
              Password
            </Typography>
            <StyledTextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••••"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={!!error && !password}
              helperText={!!error && !password ? "Password is required" : ""}
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#0D0F29", height: 40, fontFamily: "Raleway, sans-serif" }}
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", fontFamily: "Raleway, sans-serif" }}
          >
            Don’t have an account?{" "}
            <Link href="/signup" style={{ color: "#0D0F29", textDecoration: "underline" }}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </StyledCard>
    </Box>
  );
}