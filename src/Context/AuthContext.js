import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";


export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [userData, setUserData] = useState(null)

    function SaveUserData() {
        let token = localStorage.getItem("token")
        let decodedToken = jwtDecode(token)
        setUserData(decodedToken)
    }

    function logOut() {
        localStorage.removeItem("token")
        setUserData(null)
        return <Navigate to='/' />
    }


    return <AuthContext.Provider value={{ userData, SaveUserData, setUserData, logOut }}>
        {children}
    </AuthContext.Provider>

}