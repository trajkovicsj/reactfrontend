import { createContext,  useState} from "react";

const AuthContex = createContext({})

export const AuthProvider = ({ children }: any) => {
    //children represents components inside AuthProvider
    const [auth, setAuth] = useState({})

    return (
        <AuthContex.Provider value={{auth, setAuth}}>
            {children}
        </AuthContex.Provider>
    )
}

export default AuthContex;