"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface Election {
  election_uuid: string;
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ElectionData {
  name: string;
  startDate: string;
  endDate: string;
}

interface ApiResponse<T> {
  message?: string;
  election?: T;
  elections?: T[];
}

export interface UseElection {
  loading: boolean;
  error: Error | null;
  createElection: (data: ElectionData) => Observable<Election>;
  fetchElections: () => Observable<Election[]>;
  fetchElectionById: (uuid: string) => Observable<Election>;
  updateElection: (uuid: string, data: Partial<Election>) => Observable<Election>;
  deleteElection: (uuid: string) => Observable<boolean>;
}

export function useElection(): UseElection {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createElection = (data: ElectionData): Observable<Election> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/election", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: ApiResponse<Election> = await res.json();
        if (!res.ok || !responseData.election) {
          throw new Error(responseData.message || "Election creation failed");
        }
        return responseData.election;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchElections = (): Observable<Election[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/election", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Election> = await res.json();
        if (!res.ok || !Array.isArray(responseData.elections)) {
          throw new Error(responseData.message || "Failed to fetch elections");
        }
        return responseData.elections;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchElectionById = (uuid: string): Observable<Election> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election/${uuid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Election> = await res.json();
        if (!res.ok || !responseData.election) {
          throw new Error(responseData.message || "Failed to fetch election");
        }
        return responseData.election;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const updateElection = (uuid: string, data: Partial<Election>): Observable<Election> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election/${uuid}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: ApiResponse<Election> = await res.json();
        if (!res.ok || !responseData.election) {
          throw new Error(responseData.message || "Failed to update election");
        }
        return responseData.election;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const deleteElection = (uuid: string): Observable<boolean> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election/${uuid}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const responseData: ApiResponse<Election> = await res.json();
          throw new Error(responseData.message || "Failed to delete election");
        }

        return true;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  return {
    loading,
    error,
    createElection,
    fetchElections,
    fetchElectionById,
    updateElection,
    deleteElection,
  };
}
