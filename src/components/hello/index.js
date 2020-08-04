import React, { useContext, useEffect } from 'react';
import { SignInContext } from '../../context/auth';
import {Redirect} from 'react-router-dom'

const superagent = require('superagent');
// const axios = require('axios');


export default function Hello(props) {

  const context = useContext(SignInContext)
  // console.log(props.location.search)
  let CLIENT_ID_GITHUB = '12b0bde50779ac5c63c0'
  let CLIENT_SECRET_GITHUB = 'fcc695611a2afa2b06758bd80863f0b4dafefdf5'
  let API_SERVER_GITHUB = 'http://localhost:3000/oauth'
  let TOKEN_SERVER_GITHUB = 'https://github.com/login/oauth/access_token'
  let REMOTE_API_GITHUB = 'https://api.github.com/user'

  // const tokenServerUrl = TOKEN_SERVER_GITHUB;
  // console.log('tokenServerUrl', tokenServerUrl);

  const remoteAPI = REMOTE_API_GITHUB;
  // console.log('remoteAPI', remoteAPI);

  const CLIENT_ID = CLIENT_ID_GITHUB;
  // console.log('CLIENT_ID', CLIENT_ID);

  const CLIENT_SECRET = CLIENT_SECRET_GITHUB;
  // console.log('CLIENT_SECRET', CLIENT_SECRET);

  const API_SERVER = API_SERVER_GITHUB;
  // console.log('API_SERVER', API_SERVER);

  useEffect(() => {
    console.log('props.location.search.split(=)[1]', props.location.search.split('=')[1])
    let code = props.location.search.split('=')[1]
    tiktok(code)
  }, [])

  const tiktok = async (code) => {
    console.log('hello from github');

    try {
      // let code = req.query.code;
      console.log('code', code);
      let remoteToken = await exchangeCodeForToken(code);
      console.log('remoteoken', remoteToken)
      let remoteUser = await getRemoteUserInfo(remoteToken);
      let user = await getUser(remoteUser);
      console.log('user', user);
      // req.user = user;
      // req.token = token;

      // next();
    } catch (e) { console.error(`ERROR: ${e.message}`); }

  };

  async function exchangeCodeForToken(code) {
    console.log('api server', API_SERVER);
    console.log('code2', code);
    let tokenResponse = await superagent
      .post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token')
      .set('Access-Control-Allow-Origin')
      .accept('application/json')
      .send({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: API_SERVER,
        grant_type: 'authorization_code',
      });
    console.log('tokenResponse', tokenResponse.body);

    let access_token = tokenResponse.body.access_token;

    return access_token;

  }

  async function getRemoteUserInfo(token) {

    let userResponse =
      await superagent.get(remoteAPI)
        .set('Authorization', `token ${token}`)
        .set('user-agent', 'express-app');

    let user = userResponse.body;
    console.log(user);
    return user;

  }

  async function getUser(remoteUser) {
    // console.log('remoteUser', remoteUser)
    // username, password,ranking, imgUrl, gender, role
    // let userRecord = {
    //   username: remoteUser.login,
    //   password: 'oauthpassword',
    //   ranking: 'super',
    //   imgUrl: 'asdasdsadas',
    //   gender: 'male',
    // };
    // console.log('user in oauth', userRecord)
    let user = context.signup(
       remoteUser.login,
       'oauthpassword',
       'super',
       remoteUser.avatar_url,
       'male',
       'user',
    );
    //   let token = users.generateToken(user);

    return user;

  }
  return (
    <>
      <Redirect to='/'/>

    </>
  )
}