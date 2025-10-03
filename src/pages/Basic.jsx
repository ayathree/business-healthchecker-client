import { Zoom } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Basic = () => {
     const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        const form = e.target;
        const name = form.name.value;
        const organization = form.organization.value;
        const position = form.position.value;
        const service = form.service.value;
        const address = form.address.value;
        const number = form.number.value;
        const year = form.year.value;
        const info={name,position,organization,service,address,number,year}
        // Save to localStorage
      localStorage.setItem('businessHealthReport-Basic', JSON.stringify({ 
        
        info,
        
        timestamp: new Date().toISOString() // Optional: add timestamp
      }));
       navigate('/position');
        
      
        console.log(info);
       
        
      };
    return (
         
        <div className="bg-blue-50">
             <div className="flex justify-center items-center">

            <img src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" alt="" className="h-[200px] w-[300px]" />
          </div>
            <div className="mt-16 ">
                <p className="text-xl text-center font-bold capitalize mt-2">please fill up this form</p>
                <div className="flex justify-center items-center mt-2">
                        <form onSubmit={handleSubmit} action="" className="">
                      <div className=" border-2 border-blue-500 w-[70vw] h-100% py-10 px-20  mt-2 ">
                            {/* part 1 */}
                        <div className="flex flex-col items-start justify-center gap-4">
                          <p className="text-xl font-semibold text-blue-500">1. Basic Information:</p>
                        <p className="text-lg text-blue-500">Please provide detailed information about your business.</p>
                            <label htmlFor="" className="font-semibold">1.1 Your Name:</label>
                            <input type="text" name="name" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.2 Name of the Organization:</label>
                            <input type="text" name="organization" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.3 Your Designation/Position:</label>
                            <input type="text" name="position" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.4 What type of product or service do you provide?</label>
                            <input type="text" name="service" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.5 Business Address:</label>
                            <input type="text" name="address" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.6 Phone Number:</label>
                            <input type="text" name="number" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.7 Business Start Date or Year:</label>
                            <input type="text" name="year" id="" className="outline-2 p-2 w-1/2"  />
                        </div>
                                               
                      </div>
                        <div className="mt-10 flex justify-center items-center mb-10">
                            <button className="bg-blue-500 text-white font-bold text-lg cursor-pointer btn hover:bg-slate-500 hover:text-black capitalize p-2 w-1/2 outline-2 flex justify-center items-center gap-3 ">next
                            <FaArrowRight className=""></FaArrowRight></button>
                        </div>
                        </form>
                </div>
            </div>
            
        </div>
        
    );
};

export default Basic;