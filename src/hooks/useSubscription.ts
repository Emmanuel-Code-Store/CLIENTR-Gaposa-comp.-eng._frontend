'use client';

import { useState } from 'react';
import { from, Observable } from 'rxjs';

export interface Subscription {
  subscription_uuid: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SubscriptionData {
  email: string;
}

interface SubscriptionSignupResponse {
  message: string;
  subscription?: Subscription;
}

interface SubscriptionDeleteResponse {
  message: string;
  success: boolean;
}

export interface UseSubscription {
  loading: boolean;
  error: Error | null;
  signup: (data: SubscriptionData) => Observable<SubscriptionSignupResponse>;
  fetchSubscriptions: () => Observable<Subscription[]>;
  fetchSubscriptionById: (uuid: string) => Observable<Subscription>;
  updateSubscription: (uuid: string, data: Partial<Subscription>) => Observable<Subscription>;
  deleteSubscription: (uuid: string) => Observable<SubscriptionDeleteResponse>;
}

export function useSubscription(): UseSubscription {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = (data: SubscriptionData): Observable<SubscriptionSignupResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('/api/subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });

          const responseData: SubscriptionSignupResponse = await res.json();
          if (!res.ok) throw new Error(responseData.message || 'Subscription failed');
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error('Unknown error');
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchSubscriptions = (): Observable<Subscription[]> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('/api/subscription', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const responseData = await res.json();
          if (!res.ok) throw new Error(responseData.message || 'Failed to fetch subscriptions');
          if (!Array.isArray(responseData.subscriptions)) {
            throw new Error("Expected 'subscriptions' to be an array");
          }
          return responseData.subscriptions as Subscription[];
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error('Unknown error');
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchSubscriptionById = (uuid: string): Observable<Subscription> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/subscription/${uuid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const responseData = await res.json();
          if (!res.ok) throw new Error(responseData.message || 'Failed to fetch subscription');
          return responseData.subscription as Subscription;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error('Unknown error');
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const updateSubscription = (uuid: string, data: Partial<Subscription>): Observable<Subscription> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/subscription/${uuid}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });
          const responseData = await res.json();
          if (!res.ok) {
            throw new Error(responseData.message || 'Failed to update subscription');
          }
          return responseData.subscription as Subscription;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error('Unknown error');
          setError(e);
          throw e;
        } finally {
          setLoading(false);
        }
      })()
    );

  const deleteSubscription = (uuid: string): Observable<SubscriptionDeleteResponse> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/subscription/${uuid}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const responseData: SubscriptionDeleteResponse = await res.json();
          if (!res.ok) {
            throw new Error(responseData.message || 'Failed to delete subscription');
          }
          return responseData;
        } catch (err: unknown) {
          const e = err instanceof Error ? err : new Error('Unknown error');
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
    signup,
    fetchSubscriptions,
    fetchSubscriptionById,
    updateSubscription,
    deleteSubscription,
  };
}