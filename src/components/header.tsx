import Image from 'next/image';


export function Header() {
  return (
    <div className="flex justify-center items-center relative">
      <Image src='/logo.svg' width={50} height={50} alt="logo" className='fixed left-11 top-11'/>
      <h1 className="montserrat-bold text-6xl py-9 text-red-700">TuduX</h1>
    </div>
  );
}
