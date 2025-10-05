import { Zoom } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center  gap-10">
            <Zoom >

            <img  src={logo} alt="" />
            <Link to={'/basic'}><FaArrowRight className="  h-[100px] w-[100px] text-blue-600 rounded-full border-2 border-blue-600 animate-[fadeInOut_1s_ease-in-out_infinite] cursor-pointer " /></Link>
            </Zoom>
            
        </div>
    );
};

export default Home;