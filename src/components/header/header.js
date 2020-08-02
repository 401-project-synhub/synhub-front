import React, { useState, useContext } from 'react';
import SignIn from '../signin/';
import SignUp from '../signup/';
import Show from '../show/';
import { SignInContext } from '../../context/auth.js';

import './header.scss';
import { Link, NavLink } from 'react-router-dom';

function Header(props) {
    const [signIN, setSignIN] = useState(false);
    const [signUP, setSignUP] = useState(false);
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
        <section className='header'>
            {/* <div> */}
            <nav>
                <ul>
                    <li>Home</li>
                    {/* <li>Community</li> */}
                    <NavLink className='link' to='/community'>Community</NavLink>
                    {/* <li>Code Along</li> */}
                    <NavLink className='link' to='./coding'>Code Together</NavLink>
                    <NavLink className='link' to='./paint'>Paint</NavLink>
                </ul>
                <Show condition={!context.signedIn}>
                    <button onClick={signInToggle} className="signing">
                        SIGNIN
                </button>
                </Show>
                <Show condition={signIN}>
                    <SignIn />
                </Show>


                <Show condition={!context.signedIn}>
                    <button onClick={signUpToggle} className="signing">
                        SIGNUP
                </button>
                </Show>
                <Show condition={signUP}>
                    <SignUp />
                </Show>
                <Show condition={context.signedIn}>
                    <button onClick={saveTheDay}>SIGNOUT</button>
                </Show>
            </nav>
            {/* </div> */}
            <div>
                <h2>Learn and Teach</h2>
                <h1>At SynHub </h1>
                <p>Adipisicing elit, sed do eiusmod tempor incididunt with labore et dolore magna aliqua enim ad minimum.</p>
            </div>
            <img id='hdr-illus' src='assets/header-illus2.png' alt='asset'></img>
            <img id='hdr-dimond1' className='hdr-dimond' src='assets/dimond-shape.png' alt='asset'></img>
            <img id='hdr-dimond2' className='hdr-dimond' src='assets/dimond-shape.png' alt='asset'></img>
            <img id='hdr-dimond3' className='hdr-dimond' src='assets/dimond-shape.png' alt='asset'></img>

        </section>
    )
}

export default Header;