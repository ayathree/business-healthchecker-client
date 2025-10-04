import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";


const StrengthScore = () => {
    const [reportData, setReportData] = useState(null);
        
        useEffect(() => {
            const storedData = localStorage.getItem('businessHealthReport-Strength');
            if (storedData) {
                setReportData(JSON.parse(storedData));
            }
        }, []);
        
        // Provide default values to prevent undefined errors
        const { totalStrengthPoints = 0, mainStrengthTotals = 0 } = reportData || {};
    return (
         <div className="bg-blue-50">
            <div className="flex justify-center items-center">
                <img 
                    src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" 
                    alt="" 
                    className="h-[200px] w-[300px]" 
                />
            </div>
            
            <div className="mt-16 flex flex-col justify-center items-center">
                <div className="rounded-full border-blue-600 border-4 p-15">
                    <p className="font-bold text-9xl text-center text-blue-600">{totalStrengthPoints}</p>
                    <hr className="border-4 border-blue-600"/>
                    <p className="font-bold text-9xl text-blue-600">{mainStrengthTotals}</p>
                </div>

                
                
                {/* Only render TypeAnimation when data is available */}
                {reportData && (
                    <div className="text-center mt-16">
    <TypeAnimation
        sequence={[
            "Your Total Score in Business Strategy and Strength section is",
            500,
        ]}
        wrapper="p"
        speed={50}
        style={{ fontSize: '2em' }}
        repeat={Infinity}
    />
    <div className="flex justify-center gap-2 text-4xl font-bold">
        <span className="text-blue-600">{totalStrengthPoints}</span>
        <span>out of</span>
        <span className="text-blue-600">{mainStrengthTotals}</span>
    </div>

    <Link to={'/bloodTest'}>
    <div className="mt-10 flex justify-center items-center mb-10"><button className="bg-blue-500 text-white font-bold text-lg cursor-pointer btn hover:bg-slate-500 hover:text-black capitalize p-2 w-1/2 outline-2 flex justify-center items-center gap-3 ">next<FaArrowRight className=""></FaArrowRight></button></div></Link>

    
</div>
                )}
            </div>
        </div>
    );
};

export default StrengthScore;