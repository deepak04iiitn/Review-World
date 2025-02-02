import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashMyReviews from '../components/DashMyReviews';
import DashSavedReviews from '../components/DashSavedReviews';
import ChatHome from './ChatHome';

export default function Dashboard() {

  const location = useLocation();

  const [tab , setTab] = useState('');


  useEffect(() => {

      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');

      if(tabFromUrl)
      {
          setTab(tabFromUrl);
      }

  } , [location.search])


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>


      {/* Right Side */}

      {/* Profile */}
      {tab === 'profile' && <DashProfile />}

      {/* My Reviews */}
      {tab === 'myReviews' && <DashMyReviews />}

      {/* Saved Reviews */}
      {tab ==='savedReviews' && <DashSavedReviews />}

      {/* Chatting Section */}
      {tab ==='chat' && <ChatHome />}

    </div>
  )
}
