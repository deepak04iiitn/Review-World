import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewCard from '../components/ReviewCard';

export default function AllReviews() {

    const [allReviews, setAllReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategorySearch, setSubcategorySearch] = useState('');
    const [sortBy, setSortBy] = useState('dateDesc');

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
                <motion.h1 
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    All Reviews
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow min-w-[200px] p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <motion.select
                            whileHover={{ scale: 1.02 }}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category.replace('-', ' ')}</option>
                            ))}
                        </motion.select>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search subcategory..."
                            value={subcategorySearch}
                            onChange={(e) => setSubcategorySearch(e.target.value)}
                            className="min-w-[150px] p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <motion.select
                            whileHover={{ scale: 1.02 }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                            <option value="dateDesc">Newest First</option>
                            <option value="dateAsc">Oldest First</option>
                            <option value="ratingDesc">Highest Rated</option>
                            <option value="ratingAsc">Lowest Rated</option>
                        </motion.select>
                    </div>
                </motion.div>

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