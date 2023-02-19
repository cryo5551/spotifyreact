import { createContext, useContext, useReducer } from "react"



 

export const StateProviderContext = createContext();

export const StateProvider = ({ initialState, reducer ,children }) => {
    return (
        <div>
            <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
                {children}
            </StateProviderContext.Provider>
        </div>
    );
}

// intead of importing "StateProviderContext" in every component seprately
// and using "useContext" there we will export this instead 
export const useContextData = () => useContext(StateProviderContext);