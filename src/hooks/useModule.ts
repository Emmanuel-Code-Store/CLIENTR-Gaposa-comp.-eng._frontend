'use client';

import { useState } from 'react';
import { from, Observable } from 'rxjs';

export interface Module {
  id: string;
  moduleName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleData {
  moduleName: string;
}

export interface UseModule {
  loading: boolean;
  error: Error | null;
  createModule: (data: ModuleData) => Observable<Module>;
  fetchModules: () => Observable<Module[]>;
  fetchModuleById: (id: string) => Observable<Module>;
  updateModule: (id: string, data: Partial<Module>) => Observable<Module>;
  deleteModule: (id: string) => Observable<boolean>;
}

export function useModule(): UseModule {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: unknown): never => {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error('useModule Error:', error.message);
    setError(error);
    throw error;
  };

  const createModule = (data: ModuleData): Observable<Module> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch('/api/module', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });

          const responseData = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || 'Module creation failed');
          }

          return responseData as Module;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })(),
    );

  const fetchModules = (): Observable<Module[]> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch('/api/module', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          const responseData = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || 'Failed to fetch modules');
          }

          if (!Array.isArray(responseData.modules)) {
            throw new Error("Expected response to contain a 'modules' array");
          }

          return responseData.modules as Module[];
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })(),
    );

  const fetchModuleById = (id: string): Observable<Module> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(`/api/module/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          const responseData = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || 'Failed to fetch module');
          }

          return responseData as Module;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })(),
    );

  const updateModule = (id: string, data: Partial<Module>): Observable<Module> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(`/api/module/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });

          const responseData = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || 'Failed to update module');
          }

          return responseData as Module;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })(),
    );

  const deleteModule = (id: string): Observable<boolean> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(`/api/module/${id}`, {
            method: 'DELETE',
            credentials: 'include',
          });

          if (!res.ok) {
            const responseData = await res.json();
            throw new Error(responseData.message || 'Failed to delete module');
          }

          return true;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })(),
    );

  return {
    loading,
    error,
    createModule,
    fetchModules,
    fetchModuleById,
    updateModule,
    deleteModule,
  };
}
