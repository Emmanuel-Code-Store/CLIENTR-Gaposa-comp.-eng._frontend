interface MetadataStatement {
  description?: string;
  aaguid?: string;
  attestationCertificateKeyIdentifiers?: string[];
  protocolFamily?: string;
}

export const inMemoryUserDB: {
  [username: string]: { id: string; username: string; credentials: PublicKeyCredentialDescriptor[] };
} = {};

export const rpName = 'MyFIDOApp';
export const rpID = 'localhost';

export const supportedAlgorithmIDs = [
  -7, // ES256
  -8, // ES384
  -35, // RS1
  -36, // RS256
  -37, // RS384
  -38, // RS512
  -39, // PS256
  -257, // ECDSA with SHA-256
  -258, // ECDSA with SHA-384
  -259, // ECDSA with SHA-512
  -65535, // Reserved
];

export const metadataStatements: MetadataStatement[] = []; 

export function getUser(username: string) {
  return inMemoryUserDB[username];
}

export function createUser(username: string, displayName: string) {
  if (inMemoryUserDB[username]) {
    throw new Error('User already exists');
  }
  const newUser = {
    id: username,
    username,
    displayName,
    credentials: [],
  };
  inMemoryUserDB[username] = newUser;
  return newUser;
}

export function addUserCredential(username: string, credential: PublicKeyCredentialDescriptor) {
  const user = inMemoryUserDB[username];
  if (!user) {
    throw new Error('User not found');
  }
  user.credentials.push(credential);
}