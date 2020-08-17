import React, { useContext, useEffect } from 'react';
import { SignInContext } from '../../context/auth';
import {Redirect} from 'react-router-dom'

const superagent = require('superagent');


export default function Hello(props) {

  const context = useContext(SignInContext)
  let CLIENT_ID_GITHUB = '12b0bde50779ac5c63c0'
  let CLIENT_SECRET_GITHUB = 'fcc695611a2afa2b06758bd80863f0b4dafefdf5'
  let API_SERVER_GITHUB = 'http://localhost:3000/oauth'
  let REMOTE_API_GITHUB = 'https://api.github.com/user'

  const remoteAPI = REMOTE_API_GITHUB;

  const CLIENT_ID = CLIENT_ID_GITHUB;

  const CLIENT_SECRET = CLIENT_SECRET_GITHUB;

  const API_SERVER = API_SERVER_GITHUB;

  useEffect(() => {
    console.log('props.location.search.split(=)[1]', props.location.search.split('=')[1])
    let code = props.location.search.split('=')[1]
    tiktok(code)
  }, [])

  const tiktok = async (code) => {
    console.log('hello from github');

    try {
      console.log('code', code);
      let remoteToken = await exchangeCodeForToken(code);
      console.log('remoteoken', remoteToken)
      let remoteUser = await getRemoteUserInfo(remoteToken);
      let user = await getUser(remoteUser);
      console.log('user', user);
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
    let user = context.signup(
       remoteUser.login,
       'oauthpassword',
       'super',
       remoteUser.avatar_url,
       'male',
       'user',
    );

    return user;

  }
  return (
    <>
      <Redirect to='/'/>

    </>
  )
}