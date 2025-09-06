import Image from 'next/image';

export function Header() {
  return (
    <div className="relative flex items-center justify-center py-9 slide-up">
      {/* Logo pinned to the left side of the header */}
      <div className="absolute left-11">
        <Image 
          src="/logo.svg" 
          width={50} 
          height={50} 
          alt="logo" 
        />
      </div>

      {/* Title stays centered */}
      <h1 className="montserrat-bold text-4xl sm:text-6xl text-red-700 header-xs">
        TuduX
      </h1>
    </div>
  );
}
