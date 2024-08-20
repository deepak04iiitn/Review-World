import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashMyReviews() {

    const {currentUser} = useSelector(state => state.user);
    const [showReviewsError , setShowReviewsError] = useState(false);
    const [userReviews , setUserReviews] = useState([]);
    const [showMore , setShowMore] = useState(true);

    useEffect(() => {

        const getUserReviews = async() => {

            try {

                setShowReviewsError(false);

                const res = await fetch(`/api/user/reviews/${currentUser._id}`);
                const data = await res.json();

                if(data.success === false)
                {
                    setShowReviewsError(true);
                    return;
                }

                setUserReviews(data);

            } catch (error) {
                setShowReviewsError(true);
            }
        }

        getUserReviews();

    } , [currentUser._id])


    const handleShowMore = () => {

    }


  return (

    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

            {userReviews && userReviews.length > 0 ? (

                <>
                    <Table hoverable className='shadow-lg'>

                    <Table.Head>
                        <Table.HeadCell>Review image</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Review title</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>

                    {userReviews.map((review) => (

                            <Table.Body className='divide-y'>

                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                                <Table.Cell>

                                    <Link to={`/review/${review._id}`}>
                                        <img
                                            src={review.imageUrls[0]}
                                            alt='review cover'
                                            className='h-12 w-12 object-contain'
                                        />
                                    </Link>
                                    
                                </Table.Cell>

                                <Table.Cell>
                                    <Link to={`/review/${review._id}`}>
                                        {review.category}
                                    </Link>
                                </Table.Cell>

                                <Table.Cell>
                                    <Link to={`/review/${review._id}`}>
                                        {review.subcategory}
                                    </Link>
                                </Table.Cell>

                                <Table.Cell>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                                </Table.Cell>

                                <Table.Cell>
                                    <span>Edit</span>
                                </Table.Cell>
                            </Table.Row>
                            </Table.Body>
                    ))}

                    </Table>

                    {
                        showMore && (
                            <button className='w-full text-teal-500 self-center text-sm py-7' onClick={handleShowMore}>
                                Show more
                            </button>
                        )
                    }

                </>
            ) : (
                <p>You have no reviews yet!</p>
            )} 

        <Modal>

            <Modal.Header />

            <Modal.Body>
                <div className="text-center">

                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>

                    <div className='flex justify-center gap-4'>
                        <Button color='failure'>Yes , I'm sure</Button>
                        <Button color='gray'>No , cancel</Button>
                    </div>

                </div>
            </Modal.Body>

        </Modal>

        <p className='text-red-700 mt-5'>
            {showReviewsError ? 'Error showing reviews' : ''}
        </p>

    </div>

  )
}
