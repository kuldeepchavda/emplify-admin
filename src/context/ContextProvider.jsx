import { Children } from "react";
import AppProvider from "./AppContext";
import AuthProvider from "./AuthContext";


const ContextProvider = ({children})=>{
    return (
        <AppProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AppProvider>
    )
}

export default ContextProvider;