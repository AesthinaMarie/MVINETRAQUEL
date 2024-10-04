import React from 'react'
import E3Logo from "../assets/E3Logo.png";
import DostLogo from "../assets/DostLogo.png";

const Feature = () => {
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
        <div className='text-center'>
            <span className="bg-blue-800 text-white rounded-md h-6 text-lg font-medium px-4 py-3 uppercase">
                Main Investors
            </span>
            <h2 className='text-3xl sm:text-2xl lg:text-4xl mt-10 lg:mt-10 tracking-wide'>
           
            Meet the visionary investors driving innovation and supporting
            <span className='bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text'>
            {" "}    
            startups in MIMAROPA</span>
            </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start mt-10">
        
        {/* E3HUBS Section */}
        <div className="flex items-center mb-8 md:mb-0">
          <img src={E3Logo} alt="E3HUBS Logo" className="w-24 h-24 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">E3HUBS</h2>
            <p className="text-gray-700">
              E3HUBS is a global entrepreneurial network that accelerates startups by offering mentorship, funding, and networking, transforming innovative ideas into successful businesses.
            </p>
          </div>
        </div>

        {/* DOST Section */}
        <div className="flex items-center">
          <div className="mr-4">
            <h2 className="text-lg font-semibold">DOST</h2>
            <p className="text-gray-700">
              The Department of Science and Technology (DOST) in the Philippines supports innovative startups with funding, research, and development to boost technological growth and economic productivity.
            </p>
          </div>
          <img src={DostLogo} alt="DOST Logo" className="w-24 h-24" />
        </div>
      </div>
    
    </div>
  )
}

export default Feature