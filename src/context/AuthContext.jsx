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
         fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/check-session`, {
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) setUser(data.user.username);
        setLoading(false);
      });
      }
      g();
  }, []);
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
      alert("Logged in successfully!!")
      navigate("/");
      setUser(data.data.username);
    }
     if (!res.ok){
      setErrInfo(data.message);
        console.log(data.message)
    }};

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
      alert("Signed up successfully!!")
      // console.log("Got body\n","username",response_.data.username,"\npassword",response_.data.password,response_.success );
    }
    if (!res.ok){
      console.log("Got an error!!")
    }
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      credentials: "include",
    });
    setUser(null);
  };
    const testingData = "Context provider";

    return (
        <AuthContext.Provider value={{ testingData, user, login, signup, logout, loading ,errInfo }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
