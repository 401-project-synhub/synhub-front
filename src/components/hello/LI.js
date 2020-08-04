import React, { useContext, useEffect } from 'react';
import { SignInContext } from '../../context/auth';
import { Redirect } from 'react-router-dom'


const superagent = require('superagent');
// const users = require('../../lib/model/user/user-model.js');

/**
 * LinkedIn Oauth middleware
 * @module LinkedIn
 */
export default function Hey(props) {
    const context = useContext(SignInContext)

    let CLIENT_ID_LINKEDIN = '86l8nnz4gxbqbw'
    let CLIENT_SECRET_LINKEDIN = '5dU2yNFqJaTarPFN'
    let TOKEN_SERVER_LINKEDIN = 'https://www.linkedin.com/oauth/v2/accessToken'
    let REMOTE_API_LINKEDIN = 'https://api.linkedin.com/v2/me'
    let API_SERVER_LINKEDIN = 'http://localhost:3000/linkedoauth'

    const tokenServerUrl = process.env.TOKEN_SERVER_LINKEDIN;
    const remoteAPI = process.env.REMOTE_API_LINKEDIN;
    const CLIENT_ID = process.env.CLIENT_ID_LINKEDIN;
    const CLIENT_SECRET = process.env.CLIENT_SECRET_LINKEDIN;
    const API_SERVER = process.env.API_SERVER_LINKEDIN;
    useEffect(() => {
        console.log('props.location.search.split(=)[1]', props.location.search.split('='))
        let code = props.location.search.split('=')[1]
        toto(code)
    }, [])
    const toto = async (code) => {

        try {
            // let code = req.query.code;
            // console.log(req.query);
            console.log('(1) CODE:', code);

            let remoteToken = await exchangeCodeForToken(code);
            // console.log('(2) ACCESS TOKEN:', remoteToken);

            let remoteUser = await getRemoteUserInfo(remoteToken);
            // console.log('(3) GITHUB USER', remoteUser);

            let user = await getUser(remoteUser);
            console.log('user', user);

            // req.user = user;
            // req.token = token;
            // console.log('(4) LOCAL USER', user);

            // next();
        } catch (e) { console.error(`ERROR: ${e.message}`); }

    };

    async function exchangeCodeForToken(code) {

        let tokenResponse = await superagent.post(tokenServerUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            // .set('Access-Control-Allow-Origin')
            .accept('application/json')
            .send({
                code: code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: API_SERVER,
                grant_type: 'authorization_code',
            });
            console.log('tokenResponse LI',tokenResponse)
        let access_token = tokenResponse.body.access_token;

        return access_token;

    }

    async function getRemoteUserInfo(token) {

        let userResponse =
            await superagent.get(remoteAPI)
                .set('user-agent', 'express-app')
                .set('Authorization', `Bearer ${token}`);

        let user = userResponse.body;
        console.log(user);
        return user;

    }

    async function getUser(remoteUser) {
    console.log('remoteUser LI', remoteUser)

        let userRecord = {
            username: remoteUser.localizedLastName,
            password: 'oauthpassword',
            ranking: 'elite',
            imgUrl: 'asdasdsadas',
        };
        let user = context.signup(
            remoteUser.localizedLastName,
            'oauthpassword',
            'super',
            remoteUser.avatar_url,
            'male',
            'user',
         );
        // let user = await users.create(userRecord);
        // let token = users.generateToken(user);

        return user

    }
    return (
        <>
            <Redirect to='/' />

        </>
    )
}