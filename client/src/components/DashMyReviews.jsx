import { Button, Modal, Table } from 'flowbite-react'
import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashMyReviews() {
  return (

    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

                <Table hoverable className='shadow-md'>

                    <Table.Head>
                        <Table.HeadCell>Review image</Table.HeadCell>
                        <Table.HeadCell>Review title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>

                        <Table.Body className='divide-y'>

                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                                <Table.Cell>
                                    
                                </Table.Cell>

                                <Table.Cell>
                                    
                                </Table.Cell>

                                <Table.Cell></Table.Cell>

                                <Table.Cell>
                                    
                                </Table.Cell>

                                <Table.Cell>
                                    
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>

                </Table>

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

    </div>

  )
}
