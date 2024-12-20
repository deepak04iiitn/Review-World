import React from 'react'
import Left from '../home/left/Left'
import Right from '../home/right/Right'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function ChatHome() {

  const {currentUser} = useSelector(state => state.user);
  if (!currentUser) return <Navigate to='/sign-in' />

  return (
    <>
      <div className='flex h-screen'>
        <Left></Left>
        <Right></Right>
      </div>
    </>
  )
}
