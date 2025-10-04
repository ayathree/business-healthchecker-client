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
import VisionAndGoal from "./pages/VisionAndGoal";
import VisionScore from "./pages/score/VisionScore";
import StrengthStrategy from "./pages/StrengthStrategy";
import StrengthScore from "./pages/score/StrengthScore";
import BloodTest from "./pages/BloodTest";
import BloodTestScore from "./pages/score/BloodTestScore";
import Product from "./pages/Product";
import ProductScore from "./pages/score/ProductScore";


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
                path:'/vision',
                element:<VisionAndGoal></VisionAndGoal>
            },
            {
                path:'/strength',
                element:<StrengthStrategy></StrengthStrategy>
            },
            {
                path:'/bloodTest',
                element:<BloodTest></BloodTest>
            },
            {
                path:'/product',
                element:<Product></Product>
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
                path:'/visionScore',
                element:<VisionScore></VisionScore>
            },
            {
                path:'/strengthScore',
                element:<StrengthScore></StrengthScore>
            },
            {
                path:'/bloodTestScore',
                element:<BloodTestScore></BloodTestScore>
            },
            {
                path:'/productScore',
                element:<ProductScore></ProductScore>
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