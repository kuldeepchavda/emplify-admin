import { useState, createContext, Children, useEffect } from "react";
import useApi from "../utils/Request";
export const AppContext =  createContext()

const AppProvider  = ({children})=>{

    const {request}   = useApi();
    const [data, setData] = useState("default")
    const [jobs, setJobs]  =useState([])
    const [jobCounts, setJobCounts]  = useState(0);
    const toggleData = ()=>{
     setData((data)=>( data =="dark"?"light" :"dark") )
    }
   // TO FETCH JOBS 
  useEffect(() => {
    const j = async () => {
      const data = await request(`${import.meta.env.VITE_BACKEND_URL}/job`, { method: "GET" });
      if (data) setJobs(data.data.jobs);
      if (data) setJobCounts(data.data.counts);
      console.log(data)
    };
    j();
  }, []);
   return (
    <AppContext.Provider value={{data, toggleData, jobs, jobCounts,setJobs, setJobCounts}}> 
        {children}
    </AppContext.Provider>

)
}

export default AppProvider;