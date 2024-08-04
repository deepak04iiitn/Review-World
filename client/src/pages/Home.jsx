import React from 'react'
import { useSelector } from 'react-redux'
import { TypeAnimation } from 'react-type-animation';

export default function Home() {

  const {theme} = useSelector((state) => state.theme);

  return (
    <div>

<div className='flex flex-col items-center mt-10'>
  <div className='mt-0'>

    <TypeAnimation
      sequence={[
        'Welcome to the World of Ratings',
        1000,
        'Welcome to the World of Reviews and much more !',
        1000,
        'Grab the platform for having discussions with the reviewer',
        1000,
        'Grab the summarized rating and review by our AI',
        1000,
        'Grab the more visualistic experience by graphical analysis and trends',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: '2.5em',
        display: 'inline-block',
        background: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)', // Gradient colors
        WebkitBackgroundClip: 'text', // Ensures gradient applies to text
        WebkitTextFillColor: 'transparent', // Makes text fill transparent to show gradient
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4), -1px -1px 2px rgba(255, 255, 255, 0.4)', // Subtle shadow for clarity
    }}    
      repeat={Infinity}
    />
  </div>
</div>



      Home
    </div>
  )
}
