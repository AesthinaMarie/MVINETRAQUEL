import React from 'react'
import img1 from  "../assets/img1.jpg";
import img2 from  "../assets/img2.jpeg";
import img3 from  "../assets/img3.jpg";
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-30">
        <h1 className='text-5xl sm:text-4xl lg:text-5xl text-center tracking-wide'>
        Empowering Startups, Igniting Innovation, and Shaping the Future across
        <span className='bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text font-semibold'>
            {" "}
            MIMAROPA with MVINET
        </span>
        </h1>
        <p className='mt-10 text-lg text-center text-neutral-600 max-w-4xl'>
        MVINET (MIMAROPA Virtual Innovation Network) is a consortium of eight universities, led by DOST-MIMAROPA, driving innovation and startup growth. Through mentorship, funding, and the MVINET platform, we aim to nurture 1,000 entrepreneurs, create 10,000 jobs, and establish TBIs across universities.
        </p>
        <div className='flex justify-center my-10'>
            <a href='#' className='bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md text-white font-semibold'>
            Join as an Incubee
            </a>
            <a href='#' className='py-3 px-4 mx-3 rounder-md border'>
            Become an Investor
            </a>
        </div>
        <div className='flex mt-10 justify-center'>
            <img src={img1} alt='MVINET IMAGE' className='rounded-lg w-1/2 border border-blue-700 shadow-blue-900 mx-2 my-4'></img>
            <img src={img2} alt='MVINET IMAGE' className='rounded-lg w-1/2 border border-blue-700 shadow-blue-900 mx-2 my-4'></img>
        </div>
    </div>
  )
}

export default HeroSection