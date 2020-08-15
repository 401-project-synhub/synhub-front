import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import GitHubIcon from '@material-ui/icons/GitHub';

export default function GitHub(props) {
    
        let GithubURL = 'https://github.com/login/oauth/authorize';
    
        let options1 = {
            client_id: '12b0bde50779ac5c63c0',
            redirect_uri: 'http://localhost:3000/oauth',
            scope: 'read:user',
            // state: 'asldfjdfs',
        };
    
        // console.log('hello from the gh oauth');
    
        let QueryString = Object.keys(options1).map((key) => {
            return `${key}=` + encodeURIComponent(options1[key]);
        }).join('&');

    return (
        <>
        <a id='GithubOauth' href={`${GithubURL}?${QueryString}`}>
            <GitHubIcon />
        </a>

        </>
    )
}