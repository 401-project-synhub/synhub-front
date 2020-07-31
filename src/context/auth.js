import React ,{useState} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent'
// import superagent from 'superagent';
dotenv.config();

// const API = process.env.API_SERVER  || 'https://synhub.herokuapp.com' 
const API = process.env.API_SERVER  || 'https://synhub-project.herokuapp.com';
 

const SECRET = process.env.JWT_SECRET || 'batool123'


export const SignInContext = React.createContext();


class SignInProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      signin: this.signin,
      signout: this.signout,
      signup: this.signup,
      user: {},
    };
  }

  signup = async (username, password,ranking, imgUrl, gender, role) => {//email
      
    try {
    
      superagent.post(`${API}/signup`)
      .send({ username, password, ranking, imgUrl, gender, role })
      .accept('application/json')
      // .set('Authorization', `Bearer ${token}`)
      .then(data => {
          // console.log('token',data.body)
          this.validateToken(data.body.token.token);
        }).catch(console.error);
      
    } catch (ex) {
      console.log('ERROR SIGNUP');
          
    }
  }


  signin = async (username, password) => {

     try {
    
      superagent.get(`${API}/signin`)
      .send({ username, password })
      .accept('application/json')
      .set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
      .then(data => {
          // console.log('token',this.validateToken(data.body.token))
          this.validateToken(data.body.token);
        }).catch(console.error);
      
    } catch (ex) {
      console.log('ERROR SIGNIN');
          
    }
  }

  signout = () => {
    this.setSignInState(false, null, {});
  }

  validateToken = token => {

    try {
      let user = jwt.verify(token, SECRET);
      this.setSignInState(true, token, user);
      // console.log('token, user', 'signedIn',token, user,this.state.signedIn)

    } catch (ex) {
      this.signout();
      console.log('token Validation error');
    }
  }

  setSignInState = (signedIn, token, user) => {
    // console.log('token11111111111',token, 'user111111111', JSON.stringify(user));
    // let cookieToken = cookie.load('auth');
    // let cookieUser = cookie.load('user');
    // if(!cookieToken){

      cookie.save('auth', token);
      cookie.save('user',JSON.stringify(user));
      this.setState({ signedIn, user, token });
    // }
  }

  componentDidMount() {
    const cookieToken = cookie.load('auth');
    const token = cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return (
      <SignInContext.Provider value={this.state}>
        {this.props.children}
      </SignInContext.Provider>
    );
  }
}

export default SignInProvider;