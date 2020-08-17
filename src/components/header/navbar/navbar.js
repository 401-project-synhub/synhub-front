import React, { useState, useContext, useEffect } from 'react';
import SignIn from '../../signin/';
import SignUp from '../../signup/';
import Show from '../../show/';
import { SignInContext } from '../../../context/auth.js';
import { NavLink, useHistory} from 'react-router-dom';
import './navbar.scss';



function Navbar(props) {
    const [signIN, setSignIN] = useState(false);
    const [signUP, setSignUP] = useState(false);
    const [scrolled, setScrolled] = useState('');
    const history = useHistory();


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
    }
    const signUpToggle = (e) => {
        setSignUP(!signUP);
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
                    <Show condition={context.signedIn}>
                    <a className='link' onClick={()=>{context.changeOpen(); history.push('/')}}style={{cursor:'pointer'}} href>Code Together</a>

                    </Show>

                    <NavLink className='link' to='/todo'>Task Manager</NavLink>
                    <Show condition={!context.signedIn}>
                        <button onClick={context.signInToggle} className='sign-btn'>
                            SIGNIN
                        </button>
                    </Show>

                    <Show condition={!context.signedIn}>
                        <button onClick={context.signUpToggle} className='sign-btn'>
                            SIGNUP
                        </button>
                    </Show>

                    <Show condition={context.signedIn}>
                        <button className='sign-btn' onClick={saveTheDay}>SIGNOUT</button>
                    </Show>
                </ul>
                    <Show condition={context.signINTogVal}>
                    <SignIn />
                </Show>
                <Show condition={context.signUPTogVal}>
                    <SignUp />
                </Show>
            </nav>
        </div>
    )
}

export default Navbar;