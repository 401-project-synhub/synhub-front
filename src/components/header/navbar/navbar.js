import React, { useState, useContext, useEffect } from 'react';
import SignIn from '../../signin/';
import SignUp from '../../signup/';
import Show from '../../show/';
import { SignInContext } from '../../../context/auth.js';
import { Link, NavLink } from 'react-router-dom';
import '../header.scss';



function Navbar(props) {
    const [signIN, setSignIN] = useState(false);
    const [signUP, setSignUP] = useState(false);
    const [scrolled, setScrolled] = useState('');

    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 100 ){
          setScrolled('scrolled');
        }
        else{
          setScrolled('');
        }
      }
      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
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
    return(
        <nav className={scrolled}>
                <ul>
                    {/* <li>Home</li> */}
                    <NavLink className='link' to='/'>Home</NavLink>

                    {/* <li>Community</li> */}
                    <NavLink className='link' to='/community'>Community</NavLink>
                    {/* <li>Code Along</li> */}


                    {<NavLink className='link' to='/todo'>Task Manager</NavLink>}

                    <Show condition={!context.signedIn}>
                        <button onClick={signInToggle} className='sign-btn'>
                            SIGNIN
                        </button>
                    </Show>
   
                    <Show condition={!context.signedIn}>
                        <button onClick={signUpToggle} className='sign-btn'>
                            SIGNUP
                        </button>
                    </Show>
                 
                    <Show condition={context.signedIn}>
                        <button className='sign-btn' onClick={saveTheDay}>SIGNOUT</button>
                    </Show>
                </ul>

            <Show condition={signIN}>
                        <SignIn />
                    </Show>
            <Show condition={signUP}>
                        <SignUp />
                    </Show>
            </nav>
    )
}

export default Navbar;