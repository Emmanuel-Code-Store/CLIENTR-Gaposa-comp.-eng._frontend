"use client";

import { useState } from "react";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

export interface Permission {
  permissionId: string;
  permissionName: string;
}

interface PermissionResponse {
  permissionId?: string;
  id?: string;
  permissionName?: string;
  name?: string;
}

export interface UsePermission {
  fetchPermissions: () => Observable<Permission[]>;
  loading: boolean;
  error: Error | null;
}

export function usePermission(): UsePermission {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPermissions = () => {
    setLoading(true);
    setError(null);

    return ajax.getJSON<PermissionResponse[]>("/api/permissions").pipe(
      map((res) =>
        res.map((p) => ({
          permissionId: p.permissionId ?? p.id ?? "",
          permissionName: p.permissionName ?? p.name ?? "",
        })) as Permission[]
      ),
      catchError((err) => {
        setError(err);
        return of([]);
      })
    );
  };

  return { fetchPermissions, loading, error };
}