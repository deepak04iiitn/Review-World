import React, { useState } from 'react';
import { Button, Rating, Select, Spinner, Textarea, TextInput } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { AnimatePresence, motion } from 'framer-motion';

export default function CreateReview() {
  
    const { currentUser } = useSelector((state) => state.user);
    const [starFilled, setStarFilled] = useState(0);
    const [starCount, setStarCount] = useState(0);
    const [hoverText, setHoverText] = useState('');
    const [numStar, setNumStar] = useState(0);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        category: 'uncategorized',
        subcategory: '',
        review: '',
        rating: 0
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleStarClick = (index) => {
        const ratingValue = index + 1;
        setStarFilled(ratingValue);
        setStarCount(ratingValue);
        setNumStar(ratingValue);
        setFormData(prev => ({ ...prev, rating: ratingValue }));

        const texts = ['Terrible ❌', 'Bad 👎', 'Ok 👍', 'Good 🙂', 'Great 👌'];
        setHoverText(texts[index]);
    };

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            Promise.all([...files].map(storeImage))
                .then(urls => {
                    setFormData(prev => ({
                        ...prev,
                        imageUrls: [...prev.imageUrls, ...urls]
                    }));
                    setUploading(false);
                })
                .catch(err => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images per review!');
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                reject,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(resolve);
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, i) => i !== index)
        }));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.imageUrls.length < 1) {
            setError('You must upload at least 1 image!');
            return;
        }

        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/review/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                    userEmail: currentUser.email,
                    userUsername: currentUser.username,
                    userTitle : currentUser.nickname,
                    reviewerId: currentUser._id
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            } else {
                navigate(`/review/${data._id}`);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 p-4 md:p-8"
      >
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent pb-2">
              Share Your Story
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
              Your experience matters. Let others learn from your journey.
            </p>
          </motion.div>
  
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  {/* Name Input */}
                  <div className="group relative mb-8">
                    <input
                      type="text"
                      id="name"
                      required
                      className="peer w-full px-4 py-3 rounded-xl bg-transparent border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 outline-none transition-all placeholder-transparent"
                      placeholder="Your name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                    <label className="absolute left-4 -top-6 text-sm text-gray-600 dark:text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500">
                      Your Name
                    </label>
                  </div>
  
                  {/* Category Dropdown */}
                  <div className="relative mb-8">
                    <select
                      id="category"
                      onChange={handleChange}
                      value={formData.category}
                      className="w-full px-4 py-3 rounded-xl bg-transparent border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 outline-none transition-all appearance-none"
                    >
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
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
  
                  {/* Title Input */}
                  <div className="group relative mb-8">
                    <input
                      type="text"
                      id="subcategory"
                      required
                      className="peer w-full px-4 py-3 rounded-xl bg-transparent border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 outline-none transition-all placeholder-transparent"
                      placeholder="Title"
                      onChange={handleChange}
                      value={formData.subcategory}
                    />
                    <label className="absolute left-4 -top-6 text-sm text-gray-600 dark:text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500">
                      Title
                    </label>
                  </div>
  
                  {/* Review Textarea */}
                  <div className="group relative">
                    <textarea
                      id="review"
                      required
                      rows={6}
                      className="peer w-full px-4 py-3 rounded-xl bg-transparent border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 outline-none transition-all placeholder-transparent resize-none"
                      placeholder="Your review"
                      onChange={handleChange}
                      value={formData.review}
                    />
                    <label className="absolute left-4 -top-6 text-sm text-gray-600 dark:text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500">
                      Your Review
                    </label>
                  </div>
  
                  {/* Rating Section */}
                  <div className="mt-8">
                    <p className="text-center text-lg font-medium mb-4 dark:text-white">Rate your experience</p>
                    <motion.div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStarClick(index)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-10 h-10 ${
                              index < starFilled
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            } transition-colors duration-200`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </motion.button>
                      ))}
                    </motion.div>
                    <AnimatePresence>
                      {hoverText && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-center mt-4 text-lg font-medium dark:text-white"
                        >
                          {numStar}⭐ {hoverText}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
  
              {/* Right Column */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                      Add Photos
                      <span className="text-sm font-normal text-red-500 ml-2">
                        First image will be the cover (max 6)
                      </span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="relative group">
                            <input
                              type="file"
                              id="images"
                              accept="image/*"
                              multiple
                              onChange={(e) => setFiles(e.target.files)}
                              className="hidden"
                            />
                            <div className="h-12 px-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 group-hover:border-purple-500 transition-colors">
                              <span className="text-gray-600 dark:text-gray-300">Choose files</span>
                            </div>
                          </div>
                        </label>
                        <motion.button
                          type="button"
                          onClick={handleImageSubmit}
                          disabled={uploading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Upload'
                          )}
                        </motion.button>
                      </div>
  
                      {imageUploadError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm"
                        >
                          {imageUploadError}
                        </motion.p>
                      )}
  
                      <div className="grid grid-cols-2 gap-4">
                        {formData.imageUrls.map((url, index) => (
                          <motion.div
                            key={url}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group rounded-xl overflow-hidden"
                          >
                            <img
                              src={url}
                              alt="review"
                              className="w-full h-40 object-cover transition-transform group-hover:scale-110"
                            />
                            <motion.button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              whileHover={{ scale: 1.1 }}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              ×
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
  
                <motion.button
                  type="submit"
                  disabled={loading || uploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-medium text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-2xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    'Share Your Review'
                  )}
                </motion.button>
  
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xl p-4"
                    >
                      <p className="text-red-600 dark:text-red-200 text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };
  