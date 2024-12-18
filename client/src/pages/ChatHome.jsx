import React from 'react'
import Left from '../home/left/Left'
import Right from '../home/right/Right'

export default function ChatHome() {
  return (
    <>
      <div className='flex h-screen'>
        <Left></Left>
        <Right></Right>
      </div>
    </>
  )
}
