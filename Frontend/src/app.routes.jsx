import { createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Interview from "./features/interview/pages/interview";
import Home from "./features/interview/pages/home"
import Protected from "./features/interview/pages/home"



export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
   {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])