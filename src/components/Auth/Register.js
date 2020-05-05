import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';

import {
  Form,
  Grid,
  Header,
  Message,
  Icon,
  Segment,
  Button,
} from 'semantic-ui-react';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      // throw an error
      error = { message: 'Fill in all fields!' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
        // throw an error
        error = { message: 'Password is invalid' }
        this.setState({ errors: errors.concat(error) });
        return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
      if (password.length < 6 || passwordConfirmation.length < 6) return false
      else if (password !== passwordConfirmation) return false;
      else return true
  }
  
  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state;

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='orange' />
            Register for DevChat
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                type='text'
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='username'
                onChange={this.handleChange}
                value={username}
                fluid
              />

              <Form.Input
                type='email'
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleChange}
                value={email}
                fluid
              />

              <Form.Input
                type='password'
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                value={password}
                fluid
              />

              <Form.Input
                type='password'
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm Password'
                onChange={this.handleChange}
                value={passwordConfirmation}
                fluid
              />

              <Button size='large' fluid color='orange'>
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
              <Message error>
                  <h3>Errors</h3>
                  {this.displayErrors(errors)}
              </Message>
          )}
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
