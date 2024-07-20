import { Button, TextInput , Label , Blockquote, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import { signInStart , signInFailure , signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {

  const [formData , setFormData] = useState({});
  const { loading , error : errorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
      
      setFormData({ ...formData , [e.target.id] : e.target.value.trim() });                 // to target which field is changing

  }

  const handleSubmit = async(e) => {

      e.preventDefault();

      if(!formData.email || !formData.password)
      {
          return dispatch(signInFailure('Please fill out all the fileds!'));
      }

      try {

        dispatch(signInStart());

        const res = await fetch('/api/auth/signin' , {
            method : 'POST',
            headers : { 'COntent-Type' : 'application/json' },
            body : JSON.stringify(formData),
        })

        const data = await res.json();
        
        if(data.success === false)
        {
            dispatch(signInFailure(data.message));
        }
        
        if(res.ok)
        {
            dispatch(signInSuccess(data));
            navigate('/');
        }

      } catch (error) {
            dispatch(signInFailure(error.message));
      }
  }

  // console.log(formData);

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
                          <Label value='Your email' />
                          <TextInput
                              type='email'
                              placeholder='name@company.com'
                              id='email'
                              onChange={handleChange}
                          />
                        </div>

                        <div>
                          <Label value='Your password' />
                          <TextInput
                              type='password'
                              placeholder='********'
                              id='password'
                              onChange={handleChange}
                          />
                        </div>

                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {
                            loading ? (
                              <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                              </>
                            ) : 'Sign In'
                        }
                    </Button>

                    <OAuth />

                </form>

                <div className='flex gap-2 text-sm mt-5'>
                  <span>Don't have an account?</span>
                  <Link to='/sign-up' className='text-blue-500'>
                      Sign Up
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
