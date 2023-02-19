
export const INITIAL_STATE = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: null,
    top_artists: null,
    playing: false,
    current_song:null,
    item: null,
    playback: null,
    // token: "BQC3H9CpbvI3HN9X1UrxKGw0UyIiPw7VHipH3fe46n84uZJyUCNuT3Q1iROJuvQFDpiIAfq-XGWUMm7WAs8LStVZbLc87dSPPdsPTUUH6jj7ksp8j5HXCP3S7UaHzwT-3OKNYntTfFCbIzC5S5-Bql-qwMbp9remwSh7Txoqilt7ZCcq0uEpO0FUcQwsKwh4CmLtIWWYYYOeV2SThw",
}

const reducer = (state=INITIAL_STATE,action) => {
    console.log(action);
    switch(action.type) {

        case "SET_USER": 
        return {...state, user: action.payload}

        case "SET_TOKEN":
            return {...state, token: action.payload}

        case "SET_PLAYLISTS":
            return {...state, playlists: action.payload}

        case "SET_DISCOVER_WEEKLY":
            return {...state, discover_weekly: action.payload }

        case "SET_PLAYBACK":
            return {...state, playback: action.payload }
            
        case "SET_CURRENT_SONG":
            return {...state, current_song: action.payload }
        default: return state;
    }
}

export default reducer;