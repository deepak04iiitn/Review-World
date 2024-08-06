import { Button, Select, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux';

const slidingAnimation = {
    animation: 'slideIn 2s ease-out',
};
  
const darkThemeGlow = {
    animation: 'glowDark 1.5s infinite alternate',
};
  
const lightThemeGlow = {
    animation: 'glowLight 1.5s infinite alternate',
};

export default function CreateReview() {

    const {theme} = useSelector((state) => state.theme);
    
  return (

    <main className='p-3 max-w-4xl mx-auto'>

        <h1 className='text-3xl font-semibold text-center my-10 animate-pulse text-gradient' style={{ ...slidingAnimation, ...(theme === 'dark' ? darkThemeGlow : lightThemeGlow) }}>Give a Review</h1>

        <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes glowDark {
            from {
              text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
            }
            to {
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3);
            }
          }

          @keyframes glowLight {
            from {
              text-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.05);
            }
            to {
              text-shadow: 0 0 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2);
            }
          }
        `}
      </style>


        <form className='flex flex-col sm:flex-row gap-6 mb-10'>

            <div className='flex flex-col gap-4 flex-1'>

                <TextInput type='text'id='name' placeholder='Name' required/>

                <Select required>

                    <option value='uncategorized'>Select a category</option>
                    <option value='college'>College</option>
                    <option value='school'>School</option>
                    <option value='coaching-institute'>Coaching Institute</option>
                    <option value='degree'>Degree</option>
                    <option value='course'>Course</option>
                    <option value='stream'>Stream</option>
                    <option value='branch'>Branch</option>
                    <option value='skill'>Skill</option>
                    <option value='company'>Company</option>
                    <option value='exam'>Exam</option>
                    <option value='interview-experience'>Interview Experience</option>
                    <option value='hotel'>Hotel</option>
                    <option value='pg'>PG</option>
                    <option value='hostel'>Hostel</option>
                    <option value='flat'>Flat</option>
                    <option value='property'>Property</option>
                    <option value='society'>Society</option>
                    <option value='hospital'>Hospital</option>
                    <option value='shop'>Shop</option>
                    <option value='electronic-product'>Electronic Product</option>
                    <option value='beauty-product'>Beauty Product</option>
                    <option value='medicinal-product'>Medicinal Product</option>
                    <option value='clothing-brand'>Clothing Brand</option>
                    <option value='building-product'>Bulding Product</option>
                    <option value='agricultural-product'>Agricultural Product</option>
                    <option value='vacation-place'>Vacation Place</option>
                    <option value='vehicle'>Vehicle</option>
                    <option value='movie'>Movie</option>
                    <option value='web-series'>Web Series</option>
                    <option value='serials'>Serials</option>
                    <option value='city'>City</option>
                    <option value='state'>State</option>
                    <option value='country'>Country</option>
                    <option value='village'>Village</option>
                    <option value='theatre'>Theatre</option>
                    <option value='restaurant'>Restaurant</option>
                    <option value='website'>Website</option>
                    <option value='app'>App</option>
                    <option value='bank'>Bank</option>
                    <option value='courier-service'>Courier Service</option>
                    
                </Select>

                <Textarea placeholder='Write a Review...' required rows={4} />

                <Select required>

                    <option value='unrated'>Give a Rating</option>
                    <option value='one'>1</option>
                    <option value='one-five'>1.5</option>
                    <option value='two'>2</option>
                    <option value='two-five'>2.5</option>
                    <option value='three'>3</option>
                    <option value='three-five'>3.5</option>
                    <option value='four'>4</option>
                    <option value='four-five'>4.5</option>
                    <option value='five'>5</option>
            
                </Select>

            </div>

            <div className='flex flex-col flex-1 gap-4'>

                <p className='font-semibold'>Images :
                    <span className='font-normal text-red-500 ml-2'>The first image will be the cover (max 6) </span>
                </p>

                <div className='flex gap-4'>
                    <div className='border border-gray-300 rounded-lg w-full h-14 p-1.5'>
                        <input className='rounded-lg w-full h-full' type='file' id='images' accept='image/*' multiple />
                    </div>
                    <Button type='button' gradientDuoTone='purpleToPink' outline>
                        <span className='mt-1.5'>UPLOAD</span>
                    </Button>
                </div>

                <Button type='submit' gradientDuoTone='purpleToPink'>Give Review</Button>

            </div>

        </form>

    </main>
  )
}
