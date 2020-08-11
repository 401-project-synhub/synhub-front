import React, {useContext} from 'react';
import { SignInContext } from '../../context/auth';
import Show from '../show/';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SignUP extends React.Component {

  static contextType = SignInContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      ranking:'',
      imgUrl:'',
      gender:'',
      role: '',
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.context.signup(this.state.username, this.state.password, this.state.ranking, this.state.imgUrl, this.state.gender, this.state.role);
    this.context.signUpToggle();
    e.target.reset();
  }
  render() {
      return (
        // console.log(this.context),
      <>
        {/* <Show condition={!this.context.signedIn}> */}
          {/* <h2>Sign Up</h2> */}
          {/* <Form className="display-none" role="form" onSubmit={this.handleSubmit} > */}

            {/* <Form.Label>
              <span>User name</span>
              <Form.Control
                placeholder="userName"
                name="username"
                onChange={this.handleChange}
              />
            </Form.Label> */}

            {/* <Form.Label>
              <span>Password</span>
              <Form.Control
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Label> */}

            {/* <Form.Label>
              <span>ranking</span>
              <Form.Control
                placeholder="rank"
                name="ranking"
                onChange={this.handleChange}
              />
            </Form.Label> */}

            {/* <Form.Label>
              <span>Image</span>
              <Form.Control
                placeholder="Image URL"
                name="imgUrl"
                onChange={this.handleChange}
              />
            </Form.Label> */}
            {/* <Form.Label>
              <span>gender</span>
              <Form.Control
                placeholder="gender"
                name="gender"
                onChange={this.handleChange}
              />
            </Form.Label>
            <Form.Label>
              <span>role</span>
              <Form.Control
                placeholder="role"
                name="role"
                onChange={this.handleChange}
              />
            </Form.Label> */}
            
            

            {/* <Button className="btn btn-primary btn-large centerButton" type="submit">SignUP</Button> */}
          {/* </Form> */}
        {/* </Show> */}
        <div className="bgBlack">
          <div className="sign-popup">
            <Show condition={!this.context.signedIn}>
          <span id='close' onClick={this.context.signUpToggle}>X</span>
              <h2>Sign Up</h2>
              <Form role="form" onSubmit={this.handleSubmit} >
                  <Form.Control
                    placeholder="username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <Form.Control
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                   <Form.Control
                    placeholder="Image URL"
                    name="imgUrl"
                    onChange={this.handleChange}
                  />
                   <Form.Control
                    placeholder="gender"
                    name="gender"
                    onChange={this.handleChange}
                  />
                  
                <Button size="sm" className="btn btn-primary btn-large centerButton" type="submit">SignUP</Button>
              </Form>
            </Show>
          </div>
        </div>
      </>
    );
  }

}

export default SignUP;