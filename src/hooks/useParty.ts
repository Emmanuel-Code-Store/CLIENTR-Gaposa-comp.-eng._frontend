"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface Party {
  partyId: string;
  partyName: string;
  partyDescription: string;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PartyData {
  partyName: string;
  partyDescription: string;
}

interface PartyResponse {
  message: string;
  party: Party;
}

interface PartiesResponse {
  message?: string;
  parties: Party[];
}

interface DeleteResponse {
  message: string;
  success: boolean;
}

export interface UseParty {
  loading: boolean;
  error: Error | null;
  createParty: (data: PartyData) => Observable<PartyResponse>;
  fetchParties: () => Observable<Party[]>;
  fetchPartyById: (uuid: string) => Observable<PartyResponse>;
  updateParty: (uuid: string, data: Partial<Party>) => Observable<PartyResponse>;
  deleteParty: (uuid: string) => Observable<DeleteResponse>;
}

export function useParty(): UseParty {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createParty = (data: PartyData): Observable<PartyResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/party", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData: PartyResponse = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Party creation failed");
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchParties = (): Observable<Party[]> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/party", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData: PartiesResponse = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Failed to fetch parties");
          if (!Array.isArray(responseData.parties)) {
            throw new Error("Expected 'parties' to be an array");
          }
          return responseData.parties;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchPartyById = (uuid: string): Observable<PartyResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/party/${uuid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData: PartyResponse = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Failed to fetch party");
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const updateParty = (uuid: string, data: Partial<Party>): Observable<PartyResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/party/${uuid}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData: PartyResponse = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Failed to update party");
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const deleteParty = (uuid: string): Observable<DeleteResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/party/${uuid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData: DeleteResponse = await res.json();
          if (!res.ok) {
            throw new Error(responseData.message || "Failed to delete party");
          }
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  return {
    loading,
    error,
    createParty,
    fetchParties,
    fetchPartyById,
    updateParty,
    deleteParty,
  };
}