import React from 'react';
import SignIn from '../signin/';
import SignUp from '../signup/';
import './header.scss';

function Header(props) {

    return (
        <section className='header'>
            {/* <div> */}
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Community</li>
                        <li>Code Along</li>
                    </ul>
                    <SignIn/>
                    <SignUp/>
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