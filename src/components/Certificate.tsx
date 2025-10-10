"use client"
import { Box, Typography, Paper, Container, styled } from "@mui/material"

const CertificateContainer = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "900px",
  minHeight: "650px",
  margin: "0 auto",
  padding: theme.spacing(4),
  background: "#f5f5f5",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
}))

const DiagonalCorner = styled(Box)(({  }) => ({
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "#002b3d",
  transform: "rotate(45deg)",
  zIndex: 1,
}))

const GoldAccent = styled(Box)(({  }) => ({
  position: "absolute",
  background: "#f0c14b",
  zIndex: 2,
}))

const CertificateContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 10,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(6),
}))

const CertificateTitle = styled(Typography)(({ theme }) => ({
  color: "#d67d29",
  fontWeight: 700,
  textAlign: "center",
  fontSize: "4rem",
  marginBottom: theme.spacing(1),
  fontFamily: "'Playfair Display', serif",
}))

const CertificateSubtitle = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontWeight: 700,
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: theme.spacing(6),
  fontFamily: "'Playfair Display', serif",
}))

const RecipientName = styled(Typography)(({ theme }) => ({
  fontFamily: "'Dancing Script', cursive",
  fontSize: "3.5rem",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  color: "#000",
}))

const SignatureLine = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "1px",
  background: "#000",
  marginBottom: theme.spacing(1),
}))

const SignatureContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: theme.spacing(8),
}))

const SignatureBlock = styled(Box)(({  }) => ({
  width: "40%",
  textAlign: "center",
}))

const Seal = styled(Box)(({  }) => ({
  position: "absolute",
  top: "120px",
  right: "80px",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "radial-gradient(circle, #f5c542 0%, #e09b23 70%, #d67d29 100%)",
  boxShadow: "0 0 15px rgba(255,215,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 5,
  "&::after": {
    content: '""',
    position: "absolute",
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "2px dashed #8B4513",
  },
}))

const Ribbon = styled(Box)(({  }) => ({
  position: "absolute",
  top: "0",
  right: "140px",
  width: "40px",
  height: "300px",
  background: "#f0c14b",
  zIndex: 3,
}))

const WatermarkContainer = styled(Box)(({  }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "400px",
  opacity: 0.05,
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const Certificate = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CertificateContainer>
        {/* Background elements */}
        <DiagonalCorner sx={{ top: "-150px", left: "-150px" }} />
        <DiagonalCorner sx={{ bottom: "-150px", right: "-150px" }} />
        <GoldAccent sx={{ top: "-10px", left: "50px", width: "200px", height: "30px", transform: "rotate(45deg)" }} />
        <GoldAccent
          sx={{ bottom: "-10px", right: "50px", width: "200px", height: "30px", transform: "rotate(45deg)" }}
        />

        {/* Ribbon and Seal */}
        <Ribbon />
        <Seal>
          <Box
            sx={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#f0c14b",
              border: "4px solid #d67d29",
            }}
          />
        </Seal>

        {/* Watermark */}
        <WatermarkContainer>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              border: "10px solid #eee",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "80%",
                border: "10px solid #eee",
                borderRadius: "50%",
              }}
            />
          </Box>
        </WatermarkContainer>

        {/* Certificate Content */}
        <CertificateContent>
          <Box>
            <CertificateTitle variant="h1">CERTIFICATE</CertificateTitle>
            <CertificateSubtitle variant="h2">OF RECOGNITION</CertificateSubtitle>

            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
              This Certificate is proudly awarded to:
            </Typography>

            <RecipientName variant="h3">Juliana Silva</RecipientName>

            <Typography variant="body1" align="center" sx={{ mb: 2, px: 4, lineHeight: 1.6 }}>
              For her commendable effort and achievement as a student of Name of School
              <Box component="span" sx={{ fontWeight: "bold", display: "inline" }}>
                {" "}
                WITH HONORS
              </Box>
              , having achieved a GWA of 90% for the School Year 2022-2023.
            </Typography>
          </Box>

          <SignatureContainer>
            <SignatureBlock>
              <SignatureLine />
              <Typography variant="h6" fontWeight="bold">
                Lorna Alvarado
              </Typography>
              <Typography variant="body2">School Principal</Typography>
            </SignatureBlock>

            <SignatureBlock>
              <SignatureLine />
              <Typography variant="h6" fontWeight="bold">
                Aaron Loeb
              </Typography>
              <Typography variant="body2">Class Adviser</Typography>
            </SignatureBlock>
          </SignatureContainer>
        </CertificateContent>
      </CertificateContainer>
    </Container>
  )
}

export default Certificate
