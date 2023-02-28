// https://developer.spotify.com/documentation
// /web-playback-sdk/quick-start/

export const authEndpoint =
    "https://accounts.spotify.com/authorize";

const redirectUrl = "http://localhost:3000/home";

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
