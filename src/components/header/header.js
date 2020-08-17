import React, { useState, useContext, useEffect} from 'react';
import SignIn from '../signin/';
import SignUp from '../signup/';
import Show from '../show/';
import { SignInContext } from '../../context/auth.js';

import './header.scss';
import { NavLink, useHistory} from 'react-router-dom';

function Header(props) {
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
    const saveTheDay = (e) => {
        context.signout();
        context.signUP ? context.signUpToggle() : doNothing();
        context.signIN ? context.signInToggle() : doNothing();
    }
    const doNothing = () => { }

    return (
        <section className='header'>
            <nav className={scrolled}>
                <ul>
                    <NavLink className='link' to='/'>Home</NavLink>
                    <NavLink className='link' to='/community'>Community</NavLink>
                    <Show condition={context.signedIn}>
                        <a className='link' onClick={()=>{context.changeOpen();history.push('/')}} style={{ cursor: 'pointer' }} href>Code Together</a>
                    </Show>
                    <Show condition={context.signedIn}>
                    {<NavLink className='link' to='/todo'>Task Manager</NavLink>}
                    </Show>
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
            <div>
                <h2>Learn and Teach</h2>
                <h1>At SynHub </h1>
                <p>This is what software developers call Home. Ideas get born, raised and matured here.</p>
            </div>
            <img id='hdr-illus' src='/assets/header-illus2.png' alt='asset'></img>
            <img id='hdr-dimond1' className='hdr-dimond' src='/assets/dimond-shape.png' alt='asset'></img>
            <img id='hdr-dimond2' className='hdr-dimond' src='/assets/dimond-shape.png' alt='asset'></img>
            <img id='hdr-dimond3' className='hdr-dimond' src='/assets/dimond-shape.png' alt='asset'></img>

        </section>
    )
}

export default Header;