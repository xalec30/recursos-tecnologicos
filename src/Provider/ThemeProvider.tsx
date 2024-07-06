import { useContext, createContext,useState } from "react";

const ThemeContext = createContext<any>("");

const ThemeContextProvider = ({ children }:any) => {

    const [theme,setTheme] = useState(localStorage.getItem('theme') || "light");
    document.querySelector('html')?.setAttribute('data-theme',theme);
    

    const handlerTheme = (theme:string) => {
        setTheme(theme);
        localStorage.setItem('theme',theme);
        document.querySelector('html')?.setAttribute('data-theme',theme);
    }

    return (
        <ThemeContext.Provider value={{theme,handlerTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;

export const useTheme = () => {
    return useContext(ThemeContext);
  };