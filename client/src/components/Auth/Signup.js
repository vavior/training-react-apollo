import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
};

class Signup extends Component {
    state = { ...initialState };
    clearState = () => this.setState({ ...initialState });

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    handleSubmit = (signupUser) => (event) => {
        event.preventDefault();
        signupUser().then(({ data: { signupUser: { token } } }) => {
            console.log(token);
            localStorage.setItem('token', token);
            this.clearState();
        });
    };

    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;
        return !username || !email || !password || password !== passwordConfirmation;
    };

    render () {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div className="App">
                <h2>Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {(signupUser, { loading, error }) => (
                        <form className="form" onSubmit={this.handleSubmit(signupUser)}>
                            <input type="text" value={username} name="username" placeholder="Username" onChange={this.handleChange} />
                            <input type="email" value={email} name="email" placeholder="Email address" onChange={this.handleChange} />
                            <input type="password" value={password} name="password" placeholder="Password" onChange={this.handleChange} />
                            <input type="password" value={passwordConfirmation} name="passwordConfirmation" placeholder="Confirm password" onChange={this.handleChange} />
                            <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                            {error && <Error error={error} />}
                        </form>
                    )}
                </Mutation>
            </div>
        )
    }
};

export default Signup;