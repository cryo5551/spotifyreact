// --- 1. CONFIGURATION ---
const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const redirectUri = "http://127.0.0.1:3000/"; 
const clientId = "66bbd63b6bf54ddabd399e63184b22c9"; 

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify"
];

// --- 2. PKCE SECURITY CODE GENERATORS ---
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// --- 3. THE LOGIN ACTION ---
export const loginUrl = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('code_verifier', codeVerifier);
  
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  window.location.href = `${authEndpoint}?${params.toString()}`;
};

// --- 4. THE TOKEN EXTRACTOR ---
export const getTokenFromUrl = async (code) => {
  const verifier = window.localStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  });

  const data = await response.json();
  return data.access_token;
};
