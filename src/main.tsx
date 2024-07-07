import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Routes from './Router/Routes'
import AuthContextProvider from './Provider/AuthProvider';
import ThemeContextProvider from './Provider/ThemeProvider';

//bulma and style
import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.min.css';
import 'bulma/css/bulma.min.css';
import 'animate.css';
import './assets/css/style.css';

//font source
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
)
