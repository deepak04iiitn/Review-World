import { Button, FloatingLabel , Blockquote, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData , setFormData] = useState({});
  const [errorMessage , setErrorMessage] = useState(null);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
      
      setFormData({ ...formData , [e.target.id] : e.target.value.trim() });                 // to target which field is changing

  }

  const handleSubmit = async(e) => {

      e.preventDefault();

      if(!formData.username || !formData.email || !formData.password)
      {
          return setErrorMessage('Please fill out all details!');
      }

      try {

        setLoading(true);
        setErrorMessage(null);

        const res = await fetch('/api/auth/signup' , {
            method : 'POST',
            headers : { 'COntent-Type' : 'application/json' },
            body : JSON.stringify(formData),
        })

        const data = await res.json();
        
        if(data.success === false)
        {
            return setErrorMessage(data.message);
        }

        setLoading(false);
        
        if(res.ok)
        {
            navigate('/sign-in');
        }

      } catch (error) {
          setErrorMessage(error.message);
          setLoading(false);
      }
  }

  console.log(formData);

  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6'>

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
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <div>
                        <FloatingLabel variant="outlined" label="Your Username" type='text' sizing='sm' id='username' onChange={handleChange}/>
                    </div>
                    <div>
                        <FloatingLabel variant="outlined" label="Your Email" type='email' sizing='sm' id='email' onChange={handleChange}/>
                    </div>
                    <div>
                        <FloatingLabel variant="outlined" label="Your Password" type='password' sizing='sm' id='password' onChange={handleChange}/>
                    </div>

                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {
                            loading ? (
                              <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                              </>
                            ) : 'Sign Up'
                        }
                    </Button>

                </form>

                <div className='flex gap-2 text-sm mt-5'>
                  <span>Have an account?</span>
                  <Link to='/sign-in' className='text-blue-500'>
                      Sign In
                  </Link>
                </div>

                {
                    errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
  )
}
