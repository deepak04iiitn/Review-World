import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreateReview from './pages/CreateReview';
import Review from './pages/Review';
import UpdateReview from './pages/UpdateReview';
import AllReviews from './pages/AllReviews';
import Trends from './pages/Trends';
import Polls from './pages/Polls';

export default function App() {
  return (
    <BrowserRouter>

    <Header />

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/create-review' element={<CreateReview />} />
                <Route path='/update-review/:reviewId' element={<UpdateReview />} />
            </Route>
            <Route path='/review/:reviewId' element={<Review />} />
            <Route path='/reviews' element={<AllReviews />} />
            <Route path='/trends' element={<Trends />} />
            <Route path='/polls' element={<Polls />} />
        </Routes>

    <Footer />
    
    </BrowserRouter>
  )
}
