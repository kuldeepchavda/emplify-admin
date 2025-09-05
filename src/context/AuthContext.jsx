import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate  = useNavigate();
    const [user, setUser] = useState();
    const [loading, setLoading]=  useState();
    const [errInfo, setErrInfo] = useState();
     useEffect(() => {
      async function g(params) {
         fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/checksession`, {
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) setUser(data.user.username);
        setLoading(false);
      });
      }
      g();
  }, []);
  
// SIGN UP 
  const signup = async (username, password) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const response_  =await res.json()
    if (res.ok) {
      setUser({ username });
      navigate("/")
      console.log("Signed up successfully!!")
      // console.log("Got body\n","username",response_.data.username,"\npassword",response_.data.password,response_.success );
    }
    if (!res.ok){
      setErrInfo(response_.message);
      console.log("Got an error!!")
    }
  };

  // LOGIN 
  const login = async (username, password) => {
    console.log(username,password)
    
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json()
     if(res.ok){
      console.log("Logged in successfully!!")
      navigate("/");
      setUser(username);
    }
     if (!res.ok){
      setErrInfo(data.message);
        console.log(data.message)
    }};

  const logout = async () => {
  
  try {
    const res =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      credentials: "include",
    });
    const data = await res.json()
    if(res.ok){
      console.log(data)
      setUser(null);
    }
  } catch (error) {
    console.log(error.message);
  }
  };
    const testingData = "Context provider";

    return (
        <AuthContext.Provider value={{ testingData, user, login, signup, logout, loading ,errInfo }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
