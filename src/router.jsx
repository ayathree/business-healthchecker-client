import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import InputForm from "./pages/InputForm";
import AdviceReport from "./pages/AdviceReport";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<InputForm></InputForm>
            },
            {
                path:'/adviceReport',
                element:<AdviceReport></AdviceReport>
            }
        ]
    }
])

export default router;