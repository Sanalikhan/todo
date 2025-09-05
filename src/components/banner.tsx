import Image from 'next/Image';
export function Banner() {
  return (
    <div className='flex flex-col bg-white mx-4 rounded-t-4xl pl-2'>
         <div className="flex justify-between items-center">
        <div className='py-2 pb-10'>
        <h1 className="montserrat-bold text-6xl pt-28 mb-10 text-black"><em className='montserrat-italic text-red-700'>İşinizi</em> ve <em className='montserrat-italic text-red-700'>hayatınızı</em>düzenleyin</h1>
        <p className='montserrat-regular2 text-xl'>Görevlerinizi düzenleyin, gününüzü verimli hale getirin, hayatınızın kontrolünü elinize alın.</p>
        </div>
        <div className='relative'>
            <Image className='rounded-4xl pr-2' src='/man.jpg' width={600} height={400} alt='bannerImage'/>
        </div>
    </div>
    <button className="
    bg-purple-700 text-white montserrat-regular2 
    px-4 py-2 rounded-full shadow-md
    transition-all duration-300
    hover:bg-purple-500 hover:text-black
    active:bg-purple-600 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-purple-300 w-32 mb-4 ml-5">Başla
  </button>
    </div>
    
  );
}