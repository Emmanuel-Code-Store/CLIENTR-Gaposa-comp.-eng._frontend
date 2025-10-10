"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface AssessmentData {
  assessment: string;
  classarm: string;
  session: string;
  term: string;
}

export interface Assessment extends AssessmentData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useAssessment = () => {
  const [loading, setLoading] = useState(false);

  const createAssessment = (data: AssessmentData): Observable<Assessment> => {
    setLoading(true);

    const request = fetch("/api/assessments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(
            errorResponse.message || "Failed to create assessment"
          );
        }
        return (await res.json()) as Assessment;
      })
      .finally(() => setLoading(false));

    return from(request);
  };

  return { createAssessment, loading };
};
