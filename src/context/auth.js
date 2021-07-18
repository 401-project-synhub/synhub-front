import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent'
dotenv.config();

const API = 'https://synhub-server.herokuapp.com';


const SECRET = process.env.JWT_SECRET || 'batool123'


export const SignInContext = React.createContext();


class SignInProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUPTogVal:false,
      signINTogVal:false,
      open: false,
      open2: false,
      changeOpen: this.changeOpen,
      changeOpen2: this.changeOpen2,
      signedIn: false,
      signUpToggle:this.signUpToggle,
      signInToggle:this.signInToggle,
      signin: this.signin,
      signout: this.signout,
      signup: this.signup,
      user: {},
    };
  }
  changeOpen = () => {
    this.setState({...this.state,open:!this.state.open})
  }
  changeOpen2 = () => {
    this.setState({...this.state,open2:!this.state.open2})
  }
  signInToggle = () => {
    this.setState({...this.state,signINTogVal:!this.state.signINTogVal});
}
 signUpToggle = () => {
  this.setState({...this.state,signUPTogVal:!this.state.signUPTogVal});
}
  signup = async (username, password, ranking, imgUrl, gender, role) => {//email
    try {

      superagent.post(`${API}/signup`)
        .send({ username, password, ranking:ranking?ranking:'Not Pro', imgUrl: imgUrl ? imgUrl : gender.toUpperCase() === 'MALE' ? 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' : 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png', gender, role:'user' })
        .accept('application/json')
        .then(data => {
          console.log('token in up', data.body.token)
          if (data.body.token.token.result) {
            this.signin(username, password)
          } else {

            this.validateToken(data.body.token.token);
          }
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

    } catch (ex) {
      this.signout();
      console.log('token Validation error');
    }
  }

  setSignInState = (signedIn, token, user) => {
    cookie.save('auth', token, { path: '/' });
    cookie.save('user', JSON.stringify(user), { path: '/' });
    this.setState({ signedIn, user, token });
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