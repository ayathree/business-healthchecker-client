import { Zoom } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="flex justify-center items-center relative">
            <Zoom delay={1000}>

            <img  src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" alt="" />
            <Link to={'/basic'}><FaArrowRight className="absolute right-10 top-5 h-[100px] w-[100px] text-blue-600 rounded-full border-2 border-blue-600 animate-[fadeInOut_1s_ease-in-out_infinite] cursor-pointer " /></Link>
            </Zoom>
            
        </div>
    );
};

export default Home;