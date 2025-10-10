import { useState } from "react";

interface FaceIdResponse {
  message: string;
  faceId?: string;
  [key: string]: unknown;
}

export const useFaceIdRegistration = (userId: string, image: File | null) => {
  const [response, setResponse] = useState<FaceIdResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerFaceId = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!image) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("faceImage", image);

    try {
      const response = await fetch("/api/face/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || "No Face Detected, Try Again.");
      }

      const data: FaceIdResponse = await response.json();
      setResponse(data);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerFaceId, loading, error, success, response };
};
