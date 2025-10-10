'use client';

import { useState } from 'react';

// --- Interfaces ---
interface CredentialDescriptor {
  id: string;
  type: 'public-key';
}

interface RegisterOptions {
  challenge: string;
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  rp?: PublicKeyCredentialRpEntity;
  excludeCredentials?: CredentialDescriptor[];
  pubKeyCredParams?: PublicKeyCredentialParameters[];
  [key: string]: unknown;
}

interface AuthenticateOptions {
  challenge: string;
  allowCredentials?: CredentialDescriptor[];
  [key: string]: unknown;
}

interface RegisterResponse {
  message: string;
  success: boolean;
}

interface AuthenticateResponse {
  message: string;
  verified: boolean;
}

// --- Helpers ---
const base64urlToArrayBuffer = (base64url: string): ArrayBuffer => {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
  return buffer.buffer;
};

const arrayBufferToBase64url = (buffer: ArrayBuffer): string => {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// --- Hook ---
interface FidoHook {
  registerFido: (userId: string) => Promise<RegisterResponse>;
  authenticateFido: (userId: string) => Promise<AuthenticateResponse>;
  isLoading: boolean;
  error: string | null;
}

export const useFido = (): FidoHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerFido = async (userId: string): Promise<RegisterResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Initiate registration
      const initRes = await fetch(`/api/fido/register/initiate/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!initRes.ok) {
        const err = await initRes.json();
        throw new Error(err.message || 'Failed to initiate FIDO registration');
      }

      const options: RegisterOptions = await initRes.json();

      const publicKey: PublicKeyCredentialCreationOptions = {
        ...options,
        challenge: base64urlToArrayBuffer(options.challenge),
        user: {
          ...options.user,
          id: base64urlToArrayBuffer(options.user.id),
        },
        excludeCredentials: options.excludeCredentials?.map(
          (cred: CredentialDescriptor): PublicKeyCredentialDescriptor => ({
            type: 'public-key',
            id: base64urlToArrayBuffer(cred.id),
          })
        ),
        rp: options.rp ?? {
          name: 'My App',
          id: window.location.hostname,
        },
        pubKeyCredParams: options.pubKeyCredParams ?? [
          { type: 'public-key', alg: -7 }, // ES256
          { type: 'public-key', alg: -257 }, // RS256
        ],
      };

      // Step 2: Create credential using WebAuthn
      const credential = (await navigator.credentials.create({
        publicKey,
      })) as PublicKeyCredential;
      if (!credential) throw new Error('Failed to create credential');

      const response = credential.response as AuthenticatorAttestationResponse;

      const credentialResponse = {
        id: credential.id,
        rawId: arrayBufferToBase64url(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
          attestationObject: arrayBufferToBase64url(response.attestationObject),
        },
      };

      // Step 3: Send credential to backend for verification
      const completeRes = await fetch('/api/fido/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, response: credentialResponse }),
      });

      const result = await completeRes.json();

      if (!completeRes.ok) throw new Error(result.message || 'Registration failed');

      return { success: true, message: result.message || 'Registration successful' };
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateFido = async (userId: string): Promise<AuthenticateResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Initiate authentication
      const initRes = await fetch(`/api/fido/authenticate/initiate/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!initRes.ok) {
        const err = await initRes.json();
        throw new Error(err.message || 'Failed to initiate FIDO authentication');
      }

      const options: AuthenticateOptions = await initRes.json();

      const publicKey: PublicKeyCredentialRequestOptions = {
        ...options,
        challenge: base64urlToArrayBuffer(options.challenge),
        allowCredentials: options.allowCredentials?.map(
          (cred: CredentialDescriptor): PublicKeyCredentialDescriptor => ({
            type: 'public-key',
            id: base64urlToArrayBuffer(cred.id),
          })
        ),
      };

      // Step 2: Get credential from authenticator
      const credential = (await navigator.credentials.get({
        publicKey,
      })) as PublicKeyCredential;
      if (!credential) throw new Error('Failed to get credential');

      const response = credential.response as AuthenticatorAssertionResponse;

      const credentialResponse = {
        id: credential.id,
        rawId: arrayBufferToBase64url(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
          authenticatorData: arrayBufferToBase64url(response.authenticatorData),
          signature: arrayBufferToBase64url(response.signature),
          userHandle: response.userHandle ? arrayBufferToBase64url(response.userHandle) : null,
        },
      };

      // Step 3: Send response to backend
      const completeRes = await fetch('/api/fido/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, response: credentialResponse }),
      });

      const result = await completeRes.json();

      if (!completeRes.ok) throw new Error(result.message || 'Authentication failed');

      return { verified: true, message: result.message || 'Authentication successful' };
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      return { verified: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return { registerFido, authenticateFido, isLoading, error };
};
