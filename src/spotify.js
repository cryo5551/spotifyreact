// https://developer.spotify.com/documentation
// /web-playback-sdk/quick-start/

/* export const authEndpoint =
    "https://accounts.spotify.com/authorize";

const redirectUrl = "http://127.0.0.1:3000/";

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
]

export const loginUrl = `${authEndpoint}?client_id=
${clientId}&redirect_uri=${redirectUrl}
&scope=${scopes.join("%20")}
&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((inititial, e) => {
            const param = e.split("=")
            inititial[param[0]] = param[1];
            return inititial;
        }, {})
}
*/
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://127.0.0.1:3000/"; // Updated for local testing
const clientId = "66bbd63b6bf54ddabd399e63184b22c9"; // Your exact Client ID

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

// --- 1. PKCE Security Code Generators ---
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// --- 2. The New Login Trigger ---
export const loginUrl = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('code_verifier', codeVerifier);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code', // The new required method
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  window.location.href = `${authEndpoint}?${params.toString()}`;
};

// --- 3. The New Token Extractor ---
export const getTokenFromUrl = async (code) => {
  const verifier = localStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  });

  const data = await response.json();
  return data.access_token; // The final secure token
};


