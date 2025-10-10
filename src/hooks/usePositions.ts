import { useState, useEffect } from 'react';

interface Position {
  position_uuid: string;
  position_name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UsePositions {
  positions: Position[];
  loading: boolean;
  error: string | null;
  fetchPositions: () => Promise<void>;
  createPosition: (position: { position_name: string; description?: string }) => Promise<boolean>;
  updatePosition: (position: { position_uuid: string; position_name: string; description?: string }) => Promise<boolean>;
  deletePosition: (position_uuid: string) => Promise<boolean>;
}

export function usePositions(): UsePositions {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/positions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      console.log('[usePositions] Fetch response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch positions');
      }

      setPositions(data.positions || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[usePositions] Fetch error:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const createPosition = async (position: { position_name: string; description?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(position),
      });
      const data = await response.json();
      console.log('[usePositions] Create response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create position');
      }

      await fetchPositions();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[usePositions] Create error:', message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePosition = async (position: { position_uuid: string; position_name: string; description?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/positions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(position),
      });
      const data = await response.json();
      console.log('[usePositions] Update response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update position');
      }

      await fetchPositions();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[usePositions] Update error:', message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePosition = async (position_uuid: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/positions/uuid?position_uuid=${position_uuid}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      console.log('[usePositions] Delete response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete position');
      }

      await fetchPositions();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[usePositions] Delete error:', message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return {
    positions,
    loading,
    error,
    fetchPositions,
    createPosition,
    updatePosition,
    deletePosition,
  };
}