import { Button, FloatingLabel , Blockquote } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7'>

            {/* left side */}
            <div className='flex-1'>

              <Link to='/'>
                  <img src="/assets/ReviewWorld1.png" alt="Review World Image" className='mx-auto h-56 w-56'/>
              </Link>

              <p className='text-lg mt-2 font-semibold text-center'>RATE , REVIEW & REPEAT</p>
              
              <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800 text-center">
                  Your Trusted Source for Summarized and Unbiased Reviews – Welcome to Review World !
              </Blockquote>

            </div>


            {/* right side */}
            <div className='flex-1'>
                <form className='flex flex-col gap-4 '>

                    <div>
                        <FloatingLabel variant="outlined" label="Your Username" sizing='sm' id='username'/>
                    </div>
                    <div>
                        <FloatingLabel variant="outlined" label="Your Email" sizing='sm' id='email'/>
                    </div>
                    <div>
                        <FloatingLabel variant="outlined" label="Your Password" sizing='sm' id='password'/>
                    </div>

                    <Button gradientDuoTone='purpleToPink' type='submit'>
                        Sign Up
                    </Button>

                </form>

                <div className='flex gap-2 text-sm mt-5'>
                  <span>Have an account?</span>
                  <Link to='/sign-in' className='text-blue-500'>
                      Sign In
                  </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
