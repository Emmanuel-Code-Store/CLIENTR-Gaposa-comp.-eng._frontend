import { useState } from "react";
import { from, Observable } from "rxjs";

// --- Entity Interfaces ---

export interface PartyPostCandidate {
  id: number;
  party_post_id: string;
  postId: number;
  partyId: number;
  candidateId: number;
  electionId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  post: {
    id: number;
    postUuid: string;
    postName: string;
  };
  party: {
    id: number;
    partyId: string;
    partyName: string;
  };
  candidate: {
    id: number;
    userId: string;
    fullname: string;
  };
  creator: {
    id: number;
    userId: string;
    fullname: string;
  };
  election: {
    id: number;
    electionUuid: string;
    name: string;
  };
}

// --- DTO for creation ---

export interface CreatePartyPostCandidateDto {
  postId: string;
  partyId: string;
  candidateId: string;
  electionId: string;
}

// --- Hook Return Type ---

export interface UsePartyPostCandidate {
  loading: boolean;
  error: Error | null;
  createPartyPostCandidate: (data: CreatePartyPostCandidateDto) => Observable<PartyPostCandidate>;
  fetchPartyPostCandidates: () => Observable<PartyPostCandidate[]>;
  fetchPartyPostCandidateById: (uuid: string) => Observable<PartyPostCandidate>;
  updatePartyPostCandidate: (uuid: string, data: Partial<PartyPostCandidate>) => Observable<PartyPostCandidate>;
  deletePartyPostCandidate: (uuid: string) => Observable<boolean>;
}

export function usePartyPostCandidate(): UsePartyPostCandidate {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // --- Create ---
  const createPartyPostCandidate = (data: CreatePartyPostCandidateDto): Observable<PartyPostCandidate> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/party_post_candidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Failed to create party post candidate.");
        }

        const responseBody = await res.json();
        if (!responseBody.partyPostCandidate) {
          throw new Error("Malformed response: 'partyPostCandidate' not found.");
        }

        return responseBody.partyPostCandidate as PartyPostCandidate;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  // --- Fetch All ---
  const fetchPartyPostCandidates = (): Observable<PartyPostCandidate[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/party_post_candidate", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Failed to fetch party post candidates.");
        }

        const responseBody = await res.json();
        return responseBody.partyPostCandidates as PartyPostCandidate[];
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  // --- Fetch By ID ---
  const fetchPartyPostCandidateById = (uuid: string): Observable<PartyPostCandidate> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/party_post_candidate/${uuid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Failed to fetch party post candidate.");
        }

        const responseBody = await res.json();
        return responseBody.partyPostCandidate as PartyPostCandidate;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  // --- Update ---
  const updatePartyPostCandidate = (
    uuid: string,
    data: Partial<PartyPostCandidate>
  ): Observable<PartyPostCandidate> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/party_post_candidate/${uuid}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Failed to update party post candidate.");
        }

        const responseBody = await res.json();
        return responseBody.partyPostCandidate as PartyPostCandidate;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  // --- Delete ---
  const deletePartyPostCandidate = (uuid: string): Observable<boolean> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/party_post_candidate/${uuid}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Failed to delete party post candidate.");
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
    createPartyPostCandidate,
    fetchPartyPostCandidates,
    fetchPartyPostCandidateById,
    updatePartyPostCandidate,
    deletePartyPostCandidate,
  };
}
