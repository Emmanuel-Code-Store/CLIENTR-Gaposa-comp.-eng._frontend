"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface ElectionPost {
  post_uuid: string;
  id?: number;
  postName: string;
  postDescription: string;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ElectionPostData {
  postName: string;
  postDescription: string;
}

export interface UseElectionPost {
  loading: boolean;
  error: Error | null;
  createElectionPost: (data: ElectionPostData) => Observable<ElectionPost>;
  fetchElectionPosts: () => Observable<ElectionPost[]>;
  fetchElectionPostById: (uuid: string) => Observable<ElectionPost>;
  updateElectionPost: (uuid: string, data: Partial<ElectionPost>) => Observable<ElectionPost>;
  deleteElectionPost: (uuid: string) => Observable<boolean>;
}

export function useElectionPost(): UseElectionPost {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createElectionPost = (data: ElectionPostData): Observable<ElectionPost> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/election_post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: { message?: string; electionPost?: ElectionPost } = await res.json();
        if (!res.ok || !responseData.electionPost) {
          throw new Error(responseData.message || "Election Post creation failed");
        }
        return responseData.electionPost;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchElectionPosts = (): Observable<ElectionPost[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/election_post", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: { message?: string; electionPosts?: ElectionPost[] } = await res.json();
        if (!res.ok || !Array.isArray(responseData.electionPosts)) {
          throw new Error(responseData.message || "Failed to fetch election posts");
        }
        return responseData.electionPosts;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchElectionPostById = (uuid: string): Observable<ElectionPost> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election_post/${uuid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: { message?: string; electionPost?: ElectionPost } = await res.json();
        if (!res.ok || !responseData.electionPost) {
          throw new Error(responseData.message || "Failed to fetch election post");
        }
        return responseData.electionPost;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const updateElectionPost = (uuid: string, data: Partial<ElectionPost>): Observable<ElectionPost> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election_post/${uuid}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: { message?: string; electionPost?: ElectionPost } = await res.json();
        if (!res.ok || !responseData.electionPost) {
          throw new Error(responseData.message || "Failed to update election post");
        }
        return responseData.electionPost;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const deleteElectionPost = (uuid: string): Observable<boolean> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/election_post/${uuid}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const responseData: { message?: string } = await res.json();
          throw new Error(responseData.message || "Failed to delete election post");
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
    createElectionPost,
    fetchElectionPosts,
    fetchElectionPostById,
    updateElectionPost,
    deleteElectionPost,
  };
}
