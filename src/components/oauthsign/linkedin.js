import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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

    return (
        <>
        <a id='linkedinOauth' href={authURLlinked}>
            <LinkedInIcon />
        </a>

        </>
    )
}