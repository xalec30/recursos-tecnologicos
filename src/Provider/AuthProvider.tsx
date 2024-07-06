import { useContext, createContext,useState } from "react";

const AuthContext = createContext<any>("");

const AuthContextProvider = ({ children }:any) => {

    const [token,setToken] = useState(localStorage.getItem('token') || null);
    const [user,setUser] = useState(localStorage.getItem('user') || null);
   
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return;
    }

    const login = () => {
        setUser(localStorage.getItem('user'));
        setToken(localStorage.getItem('token'));
        return;
    }


    return (
        <AuthContext.Provider value={{token,setToken,user,setUser,logout,login}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};