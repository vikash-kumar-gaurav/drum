import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const[activeKey, setactiveKey] = useState(null)
  useEffect(()=>{
    const handlepress = (event)=>{
      const key = event.key.toUpperCase();
      playSound(key);
      setactiveKey(key);
      setTimeout(() => {
        setactiveKey(null)
      }, 300);
    };

    window.addEventListener('keydown',handlepress);

    return()=>{
      window.removeEventListener("keydown",handlepress)
    };
  },[] );

  const playSound =(letter)=>{
    const audioElement = document.getElementById(letter);
    if(audioElement){
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }
  return (
    <>
      <div className='background w-full h-screen flex items-center justify-center md:gap-5 gap-9'>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "A" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>A</h1><span className=''>boom</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "S" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>B</h1><span className=''>clap</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "D" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>D</h1><span className=''>hihat</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "F" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>F</h1><span className=''>kick</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "G" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>G</h1><span className=''>openhat</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "H" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>H</h1><span className=''>ride</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "J" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>J</h1><span className=''>tink</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "K" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>K</h1><span className=''>snare</span></div>
        <div className={`text-white   sm:h-[60px] sm:w-[55px] md:h-[75px] md:w-[75px] w-[90px] h-[90px] box flex flex-col items-center pt-3 border-2 border-white ${activeKey === "L" ?('scale-125 duration-300 border-orange-600'):('')}`}><h1 className='font-extrabold '>L</h1><span className=''>tom</span></div>
      </div>
      <audio id='A' src="boom.wav" className='bg-green-900'></audio>
      <audio id='S' src="clap.wav"></audio>
      <audio id='D' src="hihat.wav"></audio>
      <audio id='F' src="kick.wav"></audio>
      <audio id='G' src="openhat.wav"></audio>
      <audio id='H' src="ride.wav"></audio>
      <audio id='J' src="snare.wav"></audio>
      <audio id='K' src="tink.wav"></audio>
      <audio id='L' src="tom.wav"></audio>
    </>
  )
}

export default App
