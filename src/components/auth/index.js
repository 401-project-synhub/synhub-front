import React, {useContext} from 'react';
import { SignInContext } from '../../context/auth';
import Show from '../show/';
// helper component for ACL
class Auth extends React.Component {

  static contextType = SignInContext;

  render() {
    let okToRender = false;
    // console.log(this,context.)
    try {
      okToRender = this.context.signedIn && (
        this.props.capability ?
          this.context.user.capabilities.includes(this.props.capability)
          : true
      );
    } catch (e) {
      console.warn('Not Authorized!');
    }

    return (
      <Show condition={okToRender}>
        {this.props.children}
      </Show>
    );
  }
}

export default Auth;