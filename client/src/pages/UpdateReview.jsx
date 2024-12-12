import { Button, Rating, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate , useParams } from 'react-router-dom';

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


export default function UpdateReview() {

    const {currentUser} = useSelector((state) => state.user);

    const [starFilled , setStarFilled] = useState(0);
    const [starCount , setStarCount] = useState(0);
    const [hoverText , setHoverText] = useState('');
    const [numStar , setNumStar] = useState(0);
    const [files , setFiles] = useState([]);
    const [formData , setFormData] = useState({
        imageUrls : [],
        name :'',
        category : 'uncategorized',
        subcategory : '',
        review : '',
        rating : 0
    })
    const [imageUploadError , setImageUploadError] = useState(false);
    const [uploading , setUploading] = useState(false);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);

    const navigate = useNavigate();
    const params = useParams();             // to get the ID inside the URL


    useEffect(() => {

        const fetchReview = async() => {

            const reviewId = params.reviewId;
            const res = await fetch(`/api/review/get/${reviewId}`);

            const data = await res.json();

            if(data.success === false)
            {
                console.log(data.message);
                return;
            }

            setFormData(data);

        }

        fetchReview();

    } , [])


    const handleStarClick = (index) => {

      const ratingValue = index + 1; // Calculate the clicked star rating

      // Update state variables
      setStarFilled(ratingValue);
      setStarCount(ratingValue);
      setNumStar(ratingValue);

      // Update the formData to include the new rating value
      setFormData((prevState) => ({
        ...prevState,
        rating: ratingValue, // Set the rating in formData
      }));

      // Set the hover text based on the rating
      if (index === 0) {
        setHoverText('Terrible ❌');
      } else if (index === 1) {
        setHoverText('Bad 👎');
      } else if (index === 2) {
        setHoverText('Ok 👍');
      } else if (index === 3) {
        setHoverText('Good 🙂');
      } else if (index === 4) {
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


  const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({
          ...formData,
          [id]: value,
      });
  }


  const handleSubmit = async(e) => {

      e.preventDefault();

      try {

        if(formData.imageUrls.length < 1) return setError('You must upload at least 1 image!')

        setLoading(true);
        setError(false);

        const res = await fetch(`/api/review/update/${params.reviewId}` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                ...formData,
                userRef : currentUser._id,
            }),
        });

        const data = await res.json();
        setLoading(false);

        if(data.success === false)
        {
            setError(data.message);
        }
        
        navigate(`/review/${data._id}`);

    } catch (error) {
        setError(error.message);
        setLoading(false);
    }

  }
  
    
  return (

    <main className='p-3 max-w-4xl mx-auto'>

        <h1 className='text-3xl font-semibold text-center my-10 animate-pulse text-gradient' 
          style={{ ...slidingAnimation, ...lightThemeGlow }}>Update a Review</h1>

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


        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6 mb-10'>

            <div className='flex flex-col gap-4 flex-1'>

                <TextInput type='text'id='name' placeholder='Your name' required onChange={handleChange} value={formData.name} />

                <Select required id='category' onChange={handleChange} value={formData.category}>

                    <option value='uncategorized'>Select a category</option>
                    <option value='College'>College</option>
                    <option value='School'>School</option>
                    <option value='Coaching-institute'>Coaching Institute</option>
                    <option value='Degree'>Degree</option>
                    <option value='Course'>Course</option>
                    <option value='Stream'>Stream</option>
                    <option value='Branch'>Branch</option>
                    <option value='Skill'>Skill</option>
                    <option value='Company'>Company</option>
                    <option value='Exam'>Exam</option>
                    <option value='Interview-experience'>Interview Experience</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='PG'>PG</option>
                    <option value='Hostel'>Hostel</option>
                    <option value='Flat'>Flat</option>
                    <option value='Property'>Property</option>
                    <option value='Society'>Society</option>
                    <option value='Hospital'>Hospital</option>
                    <option value='Shop'>Shop</option>
                    <option value='Electronic-product'>Electronic Product</option>
                    <option value='Beauty-product'>Beauty Product</option>
                    <option value='Medicinal-product'>Medicinal Product</option>
                    <option value='Clothing-brand'>Clothing Brand</option>
                    <option value='Building-product'>Bulding Product</option>
                    <option value='Agricultural-product'>Agricultural Product</option>
                    <option value='Vacation-place'>Vacation Place</option>
                    <option value='Vehicle'>Vehicle</option>
                    <option value='Movie'>Movie</option>
                    <option value='Web-series'>Web Series</option>
                    <option value='Serials'>Serials</option>
                    <option value='City'>City</option>
                    <option value='State'>State</option>
                    <option value='Country'>Country</option>
                    <option value='Village'>Village</option>
                    <option value='Theatre'>Theatre</option>
                    <option value='Restaurant'>Restaurant</option>
                    <option value='Website'>Website</option>
                    <option value='App'>App</option>
                    <option value='Bank'>Bank</option>
                    <option value='Courier-service'>Courier Service</option>
                    
                </Select>

                <TextInput type='text'id='subcategory' placeholder='Title' required onChange={handleChange} value={formData.subcategory} />

                <Textarea id='review' placeholder='Write a Review...' required rows={4} onChange={handleChange} value={formData.review} />

                <div className='flex row justify-evenly'>

                  <Rating size='lg' className='mt-1' required id='rating' onChange={handleChange} value={formData.rating} >
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

                <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading || uploading}>
                  {loading ? 'Updating...' : 'Update Review'}
                </Button>

                {error && <p className='text-red-700 text-sm'>{error}</p>}

            </div>

        </form>

    </main>
  )
}
