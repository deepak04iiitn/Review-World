import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import ReviewCard from '../components/ReviewCard';
import ReviewHeader from '../components/ReviewHeader';
import { useSelector } from 'react-redux';

export default function AllReviews() {
    const [allReviews, setAllReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategorySearch, setSubcategorySearch] = useState('');
    const [sortBy, setSortBy] = useState('dateDesc');

    const [showUserChatsModal, setShowUserChatsModal] = useState(false);
    const { currentUser } = useSelector(state => state.user);


    const categories = [
        'College', 'School', 'Coaching-institute', 'Degree', 'Course', 'Stream', 'Branch', 'Skill',
        'Company', 'Exam', 'Interview-experience', 'Hotel', 'PG', 'Hostel', 'Flat', 'Property',
        'Society', 'Hospital', 'Shop', 'Electronic-product', 'Beauty-product', 'Medicinal-product',
        'Clothing-brand', 'Building-product', 'Agricultural-product', 'Vacation-place', 'Vehicle',
        'Movie', 'Web-series', 'Serials', 'City', 'State', 'Country', 'Village', 'Theatre',
        'Restaurant', 'Website', 'App', 'Bank', 'Courier-service'
    ];

    useEffect(() => {
        const getAllReviews = async() => {
            try {
                setShowError(false);
                setLoading(true);

                const res = await fetch('/api/review/getAll');
                const data = await res.json();

                if(data.success === false) {
                    setShowError(true);
                    return;
                }

                setAllReviews(data);
                applyFiltersAndSort(data);
                setLoading(false);
            } catch (error) {
                setShowError(true);
                setLoading(false);
            }
        }

        getAllReviews();
    }, [])

    useEffect(() => {
        applyFiltersAndSort(allReviews);
    }, [searchTerm, selectedCategory, subcategorySearch, sortBy]);

    const applyFiltersAndSort = (reviews) => {
        let filteredReviews = reviews.filter(review => {
            const reviewText = review.review?.toLowerCase() || '';
            const categoryText = review.category?.toLowerCase() || '';
            const subcategoryText = review.subcategory?.toLowerCase() || '';
            const searchTermLower = searchTerm.toLowerCase();
            const subcategorySearchLower = subcategorySearch.toLowerCase();

            const matchesSearch = reviewText.includes(searchTermLower) ||
                                  categoryText.includes(searchTermLower) ||
                                  subcategoryText.includes(searchTermLower);
            const matchesCategory = !selectedCategory || categoryText === selectedCategory.toLowerCase();
            const matchesSubcategory = !subcategorySearch || subcategoryText.includes(subcategorySearchLower);
            
            return matchesSearch && matchesCategory && matchesSubcategory;
        });

        switch(sortBy) {
            case 'ratingDesc':
                filteredReviews.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'ratingAsc':
                filteredReviews.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                break;
            case 'dateDesc':
                filteredReviews.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case 'dateAsc':
                filteredReviews.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
                break;
            default:
                break;
        }

        setVisibleReviews(filteredReviews.slice(0, 10));
    }

    const handleShowMore = () => {
        const currentLength = visibleReviews.length;
        const newReviews = allReviews.slice(currentLength, currentLength + 10);
        setVisibleReviews([...visibleReviews, ...newReviews]);
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (showError) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error loading reviews</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

            <div className='container mx-auto px-4 py-8'>

                {/* Chat List Button for Logged-in Users */}
                {currentUser && (
                    <div className="mb-4 flex justify-end">
                        <motion.button
                            onClick={() => setShowUserChatsModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                            Your Chats
                        </motion.button>
                    </div>
                )}
                
                <ReviewHeader 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    subcategorySearch={subcategorySearch}
                    setSubcategorySearch={setSubcategorySearch}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    categories={categories}
                />

                {visibleReviews && visibleReviews.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {visibleReviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        className="text-center text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No reviews found
                    </motion.div>
                )}

                {visibleReviews.length < allReviews.length && (
                    <motion.div 
                        className="text-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowMore}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Show More
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}