import { useState } from "react";
import { from, Observable } from "rxjs";

export interface VotePayload {
  partyPostId: string;
}

export interface VoteResponse {
  id: number;
  voterId: number;
  party_post_id: number;
  createdAt: string;
}

export interface BackendVote {
  id: number;
  vote_uuid: string;
  voterId: number;
  partyPostId: number;
  createdAt: string;
  voter: {
    id: number;
    fullname: string;
    email: string;
    avatar?: string;
  };
  partyPost: {
    id: number;
    candidate: {
      id: number;
      fullname: string;
      email: string;
      student_id?: string;
      staff_id?: string;
    };
    party: {
      id: number;
      partyName: string;
    };
    post: {
      id: number;
      postName: string;
    };
    election: {
      id: number;
      name: string;
    };
  };
}

export interface CandidateResult {
  candidateId: number;
  name: string;
  party: string;
  post: string;
  votes: number;
}

export interface ElectionResults {
  totalRegisteredVoters: number;
  candidates: {
    candidateId: number;
    name: string;
    party: string;
    votes: number;
  }[];
  districts: {
    id: string;
    name: string;
  }[];
  districtResults: Record<string, Record<string, number>>;
  historicalData: { year: number; turnout: number }[];
  electionName?: string;
}

export interface UseVote {
  loading: boolean;
  error: Error | null;
  castVote: (payload: VotePayload) => Observable<VoteResponse>;
  fetchResults: () => Observable<ElectionResults>;
}


export function useVote(): UseVote {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const castVote = (payload: VotePayload): Observable<VoteResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });
          const responseData = await res.json();
          if (!res.ok)
            throw new Error(responseData.error || "Failed to cast vote");
          return responseData as VoteResponse;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchResults = (): Observable<ElectionResults> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/vote", {
            method: "GET",
            credentials: "include",
          });
          const rawData: BackendVote[] = await res.json();
          if (!res.ok) throw new Error("Failed to fetch results");

          const candidateMap: Record<number, CandidateResult> = {};
          const electionName = rawData[0]?.partyPost?.election?.name || `Departmental Election ${new Date().getFullYear()}`;

          // Aggregate votes by candidate
          rawData.forEach((vote) => {
            const candidateId = vote.partyPost.candidate.id;
            if (!candidateMap[candidateId]) {
              candidateMap[candidateId] = {
                candidateId,
                name: vote.partyPost.candidate.fullname || "Unknown Candidate",
                party: vote.partyPost.party.partyName || "Department",
                post: vote.partyPost.post.postName || "Unknown Post",
                votes: 0,
              };
            }
            candidateMap[candidateId].votes += 1;
          });

          const districts: { id: string; name: string }[] = rawData.length > 0 ? [
            { id: "all", name: "All Levels" },
            { id: "nd1", name: "ND 1" },
            { id: "nd2", name: "ND 2" },
            { id: "hnd1", name: "HND 1" },
            { id: "hnd2", name: "HND 2" },
            { id: "parttime", name: "Part Time" },
          ] : [];

          const districtResults: Record<string, Record<string, number>> = rawData.length > 0 ? {
            nd1: { a: 800, b: 600, c: 300, d: 200 },
            nd2: { a: 750, b: 700, c: 400, d: 250 },
            hnd1: { a: 600, b: 500, c: 300, d: 200 },
            hnd2: { a: 550, b: 600, c: 250, d: 150 },
            parttime: { a: 500, b: 400, c: 250, d: 200 },
          } : {};

          // Fallback historical data
          const historicalData: { year: number; turnout: number }[] = rawData.length > 0 ? [
            { year: 2012, turnout: 65 },
            { year: 2016, turnout: 68 },
            { year: 2020, turnout: 72 },
            { year: 2024, turnout: 68 },
          ] : [];

          const totalRegisteredVoters = 12500;

          return {
            totalRegisteredVoters,
            candidates: Object.values(candidateMap).sort((a, b) => b.votes - a.votes),
            districts,
            districtResults,
            historicalData,
            electionName,
          };
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error("Unknown error");
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  return { loading, error, castVote, fetchResults };
}