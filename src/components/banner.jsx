import Image from 'next/image';
import React,{ useState } from 'react';
import { AddTaskForm } from './addtaskform';
export const Banner = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className='flex bg-white md:py-5 rounded-4xl slide-left'>
    <div className='flex flex-col'>
         <div className="flex justify-between items-center">
        <div className='pl-4 py-2 pb-5 sm:pb-10'>
        <h1 className="montserrat-bold text-3xl sm:text-5xl pt-8 sm:pt-28 mb-3 sm:mb-10 text-black"><em className='montserrat-italic text-red-700'>İşinizi</em> ve <em className='montserrat-italic text-red-700'>hayatınızı</em> düzenleyin</h1>
        <p className='montserrat-regular2 text-sm  sm:text-xl relative z-20'>Görevlerinizi düzenleyin, gününüzü verimli hale getirin, hayatınızın kontrolünü elinize alın.
        <Image src='/bannerimg5.jpg' width={200} height={200} alt='banner Image' className='absolute hidden sm:block sm:left-[99%] sm:w-44 md:top-0 top-[18%] rounded-full z-10 lg:left-[95%] lg:w-50'/>
        </p>

        </div>
        <div className='relative sm:flex-shrink-1 flex-shrink-1'>
            <Image className='rounded-4xl pr-2' src='/man.jpg' width={600} height={400} alt='bannerImage'/>
        </div>
    </div>
    <div className='pl-7'>
    <button className="relative
    bg-purple-700 text-white montserrat-regular2 
    px-2 py-1 sm:py-2 transition delay-100 duration-300 ease-in-out hover:translate-y-1 hover:font-bold hover:cursor-pointer hover:shadow-md rounded-full shadow-md
    hover:bg-purple-400 hover:text-black
    active:bg-purple-600 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-purple-300 w-20 sm:w-32 mb-4 ml-5"
    onClick={() => setShowForm(true)}>Başla
    <Image src='/todopop.jpg' width={50} height={50} alt='small decorative icon' className='absolute rounded-2xl bottom-[5%] left-[90%] w-9 sm:w-12 rotate-15'/>
    <Image src='/todo calander.jpg' width={40} height={40} alt='banner calender image' className='rounded-3xl absolute right-[90%] w-9 rotate-340 bottom-[5%] '/>
  </button>
  </div>
    </div>
    <AddTaskForm show={showForm} onClose={() => setShowForm(false)}/>
    </div>
  );
}