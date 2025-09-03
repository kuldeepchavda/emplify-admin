import { useState, createContext, Children } from "react";

export const AppContext =  createContext()

const AppProvider  = ({children})=>{
   const [data, setData] = useState("default")


   const toggleData = ()=>{
    setData((data)=>( data =="dark"?"light" :"dark") )
   }

   return (
    <AppContext.Provider value={{data, toggleData}}>
        {children}
    </AppContext.Provider>

)
}

export default AppProvider;