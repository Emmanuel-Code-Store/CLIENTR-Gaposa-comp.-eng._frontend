"use client";

import { useState } from "react";

export interface FaceIdApiResponse {
  data: {
    verified: boolean;
    similarity: number;
  };
  message: string;
}

export const useFaceIdAuthentication = (image: File | null) => {
  const [response, setResponse] = useState<FaceIdApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const authenticateFaceId = async (): Promise<FaceIdApiResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!image) {
      setError("Please capture an image.");
      setLoading(false);
      return null;
    }

    const formData = new FormData();
    formData.append("faceImage", image);

    console.log("Sending file to /api/face/authenticate:", image.name, image.size);

    try {
      const res = await fetch("/api/face/authenticate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Backend error");
      }

      const data: FaceIdApiResponse = await res.json();
      console.log("✅ client received:", data);

      setResponse(data);
      setSuccess(data.data.verified === true);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { authenticateFaceId, loading, error, success, response };
};
