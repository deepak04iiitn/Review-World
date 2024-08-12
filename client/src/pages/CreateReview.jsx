import { Button, Rating, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const slidingAnimation = {
  animation: 'slideIn 2s ease-out',
};

const darkThemeGlow = {
  animation: 'glowDark 1.5s infinite alternate',
};

const lightThemeGlow = {
  animation: 'glowLight 1.5s infinite alternate',
};

const slidingRightAnimation = {
  animation: 'slideInRight 2s ease-out',
};


export default function CreateReview() {

    const {theme} = useSelector((state) => state.theme);
    const [starFilled , setStarFilled] = useState(0);
    const [starCount , setStarCount] = useState(0);
    const [hoverText , setHoverText] = useState('');
    const [numStar , setNumStar] = useState(0);
    const [files , setFiles] = useState([]);
    const [formData , setFormData] = useState({
        imageUrls : [],
    })
    const [imageUploadError , setImageUploadError] = useState(false);
    const [uploading , setUploading] = useState(false);

    const handleStarClick = (index) => {

      setStarFilled(index + 1);
      setStarCount(index+1);
      setNumStar(index+1);

      if(index === 0)
      {
          setHoverText('Terrible ❌');
      }
      else if(index === 1)
      {
          setHoverText('Bad 👎');
      }
      else if(index === 2)
      {
          setHoverText('Ok 👍');
      }
      else if(index === 3)
      {
          setHoverText('Good 🙂');
      }
      else if(index === 4)
      {
          setHoverText('Great 👌');
      }

    };

    

    const handleImageSubmit = (e) => {
        
      if(files.length > 0 && files.length + formData.imageUrls.length < 7)
          {
              setUploading(true);
              setImageUploadError(false);

              const promises = [];

              for(let i = 0 ; i < files.length ; i++)
              {
                  promises.push(storeImage(files[i]));
              }

              Promise.all(promises).then((urls) => {
                  setFormData({ ...formData , imageUrls: formData.imageUrls.concat(urls),
              });

                   setImageUploadError(false);
                   setUploading(false);

              }).catch((err) => {
                  setImageUploadError('Image upload failed ( 2 mb max per image)');
                  setUploading(false);
              });
          }
          else
          {
              setImageUploadError('You can only upload 6 images per review!');
              setUploading(false);
          }

  };



  const storeImage = async(file) => {

    return new Promise((resolve, reject) => {

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };



  const handleRemoveImage = (index) => {
    setFormData({
        ...formData,
        imageUrls : formData.imageUrls.filter((_ , i) => i !== index),
    });
}


    
  return (

    <main className='p-3 max-w-4xl mx-auto'>

        <h1 className='text-3xl font-semibold text-center my-10 animate-pulse text-gradient' 
          style={{ ...slidingAnimation, ...(theme === 'dark' ? darkThemeGlow : lightThemeGlow) }}>Give a Review</h1>

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

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
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

                <TextInput type='text'id='name' placeholder='Your name' required/>

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

                <TextInput type='text'id='subcategory' placeholder='Title' required/>

                <Textarea placeholder='Write a Review...' required rows={4} />

                <div className='flex row justify-evenly'>

                  <Rating size='lg' className='mt-1' required>
                    {[...Array(5)].map((_, index) => (
                      <Rating.Star
                        key={index}
                        onClick={() => handleStarClick(index)}
                        filled={index < starFilled}
                        className='cursor-pointer'
                      />
                    ))}

                    {
                      hoverText && 
                        <>
                          <p className='ml-4 text-lg' style={slidingRightAnimation}>{numStar}⭐</p>
                          <p className='ml-4 text-lg' style={slidingRightAnimation}>{hoverText}</p>
                        </>
                    }

                  </Rating>

                </div>

            </div>

            <div className='flex flex-col flex-1 gap-4'>

                <p className='font-semibold'>Images :
                    <span className='font-normal text-red-500 ml-2'>The first image will be the cover (max 6) </span>
                </p>

                <div className='flex gap-4'>

                    <div className='border border-gray-300 rounded-lg w-full h-14 p-1.5'>
                        <input className='rounded-lg w-full h-full' type='file' id='images' accept='image/*' multiple onChange={(e) => setFiles(e.target.files)} />
                    </div>

                    <Button type='button' gradientDuoTone='purpleToPink' outline onClick={handleImageSubmit} disabled={uploading}>
                        <span className='mt-1.5'>{uploading ? <Spinner size='md' color="warning" /> : 'UPLOAD'}</span>
                    </Button>

                </div>

                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url , index) => (

                        <div key={url} className='flex justify-between p-2 border items-center shadow-lg'>

                            <img src={url} alt='listing image' className='w-10 h-10 object-contain rounded-lg' />

                            <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>

                        </div>
                    ))
                }

                <Button type='submit' gradientDuoTone='purpleToPink'>Submit Review</Button>

            </div>

        </form>

    </main>
  )
}
