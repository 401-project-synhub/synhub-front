import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

// let LinkedInURL = 'https://www.linkedin.com/oauth/v2/authorization';

// let options = {
//   response_type:'code',
//   client_id: '86l8nnz4gxbqbw',
//   redirect_uri: 'http://localhost:3000/linkedoauth',
//   scope: 'r_liteprofile',
//   state: 'asldfjdfs',
// };

// let QueryStringLinked = Object.keys(options).map((key) => {
//   return `${key}=` + encodeURIComponent(options[key]);
// }).join('&');

// let authURLlinked = `${LinkedInURL}?${QueryStringLinked}`;

// let link = document.getElementById('linkedinOauth');
// link.setAttribute('href', authURLlinked);

export default function LinkedIn(props) {
    
    let LinkedInURL = 'https://www.linkedin.com/oauth/v2/authorization';

    let options = {
      response_type:'code',
      client_id: '86l8nnz4gxbqbw',
      redirect_uri: 'http://localhost:3000/linkedoauth',
      scope: 'r_liteprofile',
      state: 'asldfjdfs',
    };
    
    let QueryStringLinked = Object.keys(options).map((key) => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join('&');
    
    let authURLlinked = `${LinkedInURL}?${QueryStringLinked}`;
    
    // let link = document.getElementById('linkedinOauth');
    // link.setAttribute('href', authURLlinked);

    return (
        <>
        <a id='linkedinOauth' href={authURLlinked}>
            <LinkedInIcon />
        </a>

        </>
    )
}