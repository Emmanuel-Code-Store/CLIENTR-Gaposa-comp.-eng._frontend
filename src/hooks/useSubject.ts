'use client';

import { useState } from 'react';
import { from, Observable } from 'rxjs';

interface Subject {
  subject_id: number;
  name: string;
  code: string;
  subject_description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SubjectSignupData {
  name: string;
  code: string;
  subject_description: string;
}

interface SubjectResponse {
  message: string;
  subject?: Subject;
}

export interface UseSubject {
  loading: boolean;
  error: Error | null;
  signup: (data: SubjectSignupData) => Observable<SubjectResponse>;
}

export function useSubject(): UseSubject {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = (data: SubjectSignupData): Observable<SubjectResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('/api/subject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
          });

          const responseData: SubjectResponse = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || 'Signup failed');
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  return {
    loading,
    error,
    signup,
  };
}