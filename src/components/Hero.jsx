import React, { useRef } from 'react'
import { useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from "react-icons/ti";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setcurrentIndex] = useState(1)
  const [hasClicked, sethasClicked] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const [loadedVideos, setloadedVideos] = useState(0)


  const totalVideos=4;
  const nextVideodRef = useRef(null)

  const upcominigVideoIndex = (currentIndex % totalVideos)+1

  const handleVideoLoad=()=>{
    setloadedVideos((prev)=>prev+1)
  }

  const getVideoSrc = (index)=>`videos/hero-${index}.mp4`

  const handleMiniVdClick=()=>{
    sethasClicked(true)
    setcurrentIndex(upcominigVideoIndex)
  }

  useGSAP(()=>{

    if(hasClicked){
      gsap.set('#next-video',{visibility:'visible'});

      gsap.to('#next-video',{
        transformOrigin : 'center center',
        scale : 1,
        width: '100%',
        height: "100%",
        duration: 1,
        ease:'power1.inOut',
        onStart: ()=>nextVideodRef.current.play(),
      })

      gsap.from('#current-video',{
        transformOrigin:'center center',
        scale:0,
        duration:1,
        ease:'power1.inOut'
      })
    }

  },{dependencies:[currentIndex],revertOnUpdate:true})

  useGSAP(()=>{
    gsap.set('#video-frame',{clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',borderRadius:'0 0 40% 10%'})

    gsap.from('#video-frame',{
      clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      borderRadius:'0 0 0 0',
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'#video-frame',
        start:'center center',
        end:'bottom center',
        scrub:0.5,
      }
    })
    
  })

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden '>
      <div id='video-frame' className='relative z-10  h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75'>
          <div>
            <div className='mask-clip-path absolute-center  absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                <div onClick={handleMiniVdClick} className='origin-center opacity-0 scale-40 transition-all ease-in duration-500 hover:scale-100  hover:opacity-100'  >
                  <video ref={nextVideodRef}
                  src={getVideoSrc(upcominigVideoIndex)} 
                  muted
                  loop
                  id='current-video'
                  className='size-64 origin-center scale-150 object-cover object-center'
                  onLoadedData={handleVideoLoad}
                  
                  />
                </div>
            </div>
            <video 
            id='next-video'
            ref={nextVideodRef}
            src={getVideoSrc(currentIndex)}
            muted
            loop
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
            />
            <video 
             src={getVideoSrc(currentIndex===totalVideos-1 ? 1 : currentIndex)}
             autoPlay
             muted
             loop
             className='absolute left-0 top-0 size-full object-cover object-center '
             onLoadedData={handleVideoLoad}
            />
          </div>

          <h1 className='special-font hero-heading absolute bottom-5 right-5 z-60 text-blue-75'>GAMING</h1>
          <div className='absolute left-0 top-0 z-40 w-full h-full'>
            <div className='mt-24 px-5 sm:px-10'> 
              <h1 className='special-font hero-heading text-blue-100'>REDEFINE</h1>
              <p className='mb-5 max-w-64 font-robert-regular text-blue-100'> Enter the Metagame layer <br /> Unleash the Player Economy</p>
              <Button id='watch-trailer'  title='Watch Trailer' leftIcon={<TiLocationArrow />}  containerClass='bg-yellow-300 flex-center gap-1' />
            </div>
          </div>
      </div>
      <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>GAMING</h1>
    </div>
  )
}

export default Hero
