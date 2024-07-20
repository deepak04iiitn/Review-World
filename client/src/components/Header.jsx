import { Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
//import { HiChatAlt } from "react-icons/hi";
import { FaMoon , FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {

    const {theme} = useSelector((state) => state.theme)                    // we wanted to know which theme is currently set
    const dispatch = useDispatch();   

  return (
    <Navbar className='border-b-2 '>

        <Link to='/' className='self-center'>

            <img src="/assets/ReviewWorld1.png" alt="Review World Image" className=' h-14 w-14  '/>
        
        </Link>

        <form>
            <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='w-20 lg:inline'/>
        </form>

        <div className='flex gap-2 md:order-2'>

            <Button className='w-12 h-10  sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}> 
                {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>

            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline> 
                    Sign In
                </Button>
            </Link>

            <Navbar.Toggle />

        </div>

        <Navbar.Collapse>
            <Navbar.Link href="/">
                Home
            </Navbar.Link>
            <Navbar.Link href="/about">
                About
            </Navbar.Link>
            <Navbar.Link href="#">
                <Dropdown label='Contacts' inline>
                    <Dropdown.Item>Email : dky42003@gmail.com</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Mobile : +91 9766599536</Dropdown.Item>
                </Dropdown>
            </Navbar.Link>
        </Navbar.Collapse>

    </Navbar>
  )
}
