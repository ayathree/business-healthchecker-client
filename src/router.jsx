import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import InputForm from "./pages/InputForm";
import AdviceReport from "./pages/AdviceReport";
import Home from "./pages/Home";
import Basic from "./pages/Basic";
import BusinessPosition from "./pages/BusinessPosition";

import PositionScore from "./pages/score/PositionScore";
import Market from "./pages/Market";
import MarketScore from "./pages/score/MarketScore";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/basic',
                element:<Basic></Basic>
            },
            {
                path:'/position',
                element:<BusinessPosition></BusinessPosition>
            },
            {
                path:'/marketScope',
                element:<Market></Market>
            },
            {
                path:'/positionScore',
                element:<PositionScore></PositionScore>
            },
            {
                path:'/marketScore',
                element:<MarketScore></MarketScore>
            },
            {
                path:'/input',
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