import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { updateFailure, updateStart, updateSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice.js';
import { Link } from 'react-router-dom';
import { Camera, LogOut, Trash2, Upload, X } from 'lucide-react';

const DashProfile = () => {
  const { currentUser, error } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Existing handlers remain the same
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setIsUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUpdateMessage({
          type: 'error',
          message: 'Could not upload image (File must be less than 2MB)',
        });
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setIsUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateMessage({ type: 'error', message: 'No changes made!' });
      return;
    }
    if (isUploading) {
      setUpdateMessage({ type: 'error', message: 'Please wait for image to upload!' });
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateMessage({ type: 'error', message: data.message });
      } else {
        dispatch(updateSuccess(data));
        setUpdateMessage({ type: 'success', message: "Profile updated successfully!" });
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-40 h-40">
                  <img
                    src={imageFileUrl || currentUser.profilePicture}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover ring-8 ring-white dark:ring-gray-800"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <div className="text-white text-xl font-bold">{uploadProgress}%</div>
                    </div>
                  )}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Camera 
                      className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 cursor-pointer"
                      onClick={() => filePickerRef.current.click()}
                    />
                  </motion.div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  className="hidden"
                />
              </motion.div>
            </div>
          </div>

          <div className="mt-24 px-8 pb-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            >
              Profile Settings
            </motion.h1>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={currentUser.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={currentUser.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter new password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Update Profile
                </motion.button>

                <Link to="/create-review" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Write a Review
                  </motion.button>
                </Link>
              </div>
            </form>

            <div className="mt-12 flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05, color: '#EF4444' }}
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 dark:text-gray-400"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => dispatch(signoutSuccess())}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 dark:text-gray-400"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {updateMessage.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 p-4 rounded-xl ${
                updateMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {updateMessage.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-center mb-6">Delete Account</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteUser}
                  className="flex-1 py-3 px-6 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Yes, Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashProfile;