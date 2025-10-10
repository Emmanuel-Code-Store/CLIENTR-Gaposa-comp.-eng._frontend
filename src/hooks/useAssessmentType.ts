"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface AssessmentTypeData {
  assessment: string;
}

export interface AssessmentType extends AssessmentTypeData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useAssessmentType = () => {
  const [loading, setLoading] = useState(false);

  const createAssessmentType = (
    data: AssessmentTypeData
  ): Observable<AssessmentType> => {
    setLoading(true);

    const request = fetch("/api/assessment-types", {
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
            errorResponse.message || "Failed to create assessment type"
          );
        }
        return (await res.json()) as AssessmentType;
      })
      .finally(() => setLoading(false));

    return from(request);
  };

  return { createAssessmentType, loading };
};
