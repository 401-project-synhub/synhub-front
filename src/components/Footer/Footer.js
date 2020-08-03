import React from 'react';
// import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import './style.scss';

function Footer(props) {
  return (
    <section id='footer-section'>
      <div className='form'>
        <h2>Subscribe Our Newsletter</h2>
        <input placeholder='Enter Your Email'></input>
        <button>Subscribe </button>
      </div>
      <footer>

        <div className='footer-middle'>
          <div className='footer-col1 footer-col'>
            <div>
              <img className='footer-logo' src="https://via.placeholder.com/170x50" />
              <p className='mission'>Lorem Ipsum availableThere are many variations passages of Lorem Ipsum available, but these majority have suffered</p>
              <ul id="menu-social-menu" class="menu"  >
                <li id="menu-item-464" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-464"><a href="#"  > <FacebookIcon color="disabled" /> </a></li>
                <li id="menu-item-465" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-465"><a href="#"  > <TwitterIcon color='disabled' /> </a></li>
                <li id="menu-item-466" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-466"><a href="#"  ><LinkedInIcon color='disabled' /></a></li>
                <li id="menu-item-467" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-467"><a href="#"  ><InstagramIcon color='disabled' /></a></li>
              </ul>
            </div>

          </div>

          <div className='footer-col2 footer-col'>
            <h2>Important Links</h2>
            <ul>
              <li> <a href="#">Link1</a> </li>
              <li> <a href="#">Link2</a> </li>
              <li> <a href="#">Link3</a> </li>
              <li> <a href="#">Link4</a> </li>
            </ul>
          </div>

          <div className='footer-col3 footer-col'>
            <h2>Help Links</h2>
            <ul>
              <li> <a href="#">Link1</a> </li>
              <li> <a href="#">Link2</a> </li>
              <li> <a href="#">Link3</a> </li>
              <li> <a href="#">Link4</a> </li>
            </ul>
          </div>

          <div className='footer-col4 footer-col'>
            <h2>Company Address</h2>
            <p><b>Address: </b> Lorem ipsum dolor sit</p>
            <p><b>Phone: </b> +962000000</p>
            <p><b>Email: </b><a href="#"> Lorem ipsum dolor sit ame</a> </p>
          </div>


        </div>



        <div class="footer-bottom">

        </div>
        {/* <!-- END FOOTER BOTTOM AREA --> */}




      </footer>
      <div class="container">


        <p className='copyright'>
          Copyright © SynHub all rights reserved.
          </p>

        <ul id="menu-footer-menu" class="text-right">
          <li id="menu-item-1054" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1054"><a href="#">Terms &#038; Condition</a></li>
          <li id="menu-item-1055" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1055"><a href="#">Privacy Policy</a></li>
          <li id="menu-item-1056" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1056"><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;