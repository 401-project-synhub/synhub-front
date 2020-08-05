import React, { useState, useContext, useEffect } from 'react';
import SignIn from '../../signin/';
import SignUp from '../../signup/';
import Show from '../../show/';
import { SignInContext } from '../../../context/auth.js';
import { Link, NavLink } from 'react-router-dom';
// import '../header.scss';
import './navbar.scss';



function Navbar(props) {
    const [signIN, setSignIN] = useState(false);
    const [signUP, setSignUP] = useState(false);
    const [scrolled, setScrolled] = useState('');

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100) {
            setScrolled('scrolled');
        }
        else {
            setScrolled('');
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })
    const context = useContext(SignInContext);
    const signInToggle = (e) => {
        setSignIN(!signIN);
        // console.log('toggled',signIN)
    }
    const signUpToggle = (e) => {
        setSignUP(!signUP);
        // console.log('toggled',signUP)
    }
    const saveTheDay = (e) => {
        context.signout();
        signUP ? signUpToggle() : doNothing();
        signIN ? signInToggle() : doNothing();
    }
    const doNothing = () => { }

    return (
        <div className='navheader'>
            <nav className={scrolled}>
                <ul>
                    <NavLink className='link' to='/'>Home</NavLink>

                    <NavLink className='link' to='/community'>Community</NavLink>

                    <NavLink className='link' to='/todo'>Task Manager</NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;