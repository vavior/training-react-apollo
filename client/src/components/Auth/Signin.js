import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    username: '',
    password: ''
};

class Signin extends Component {
    state = { ...initialState };

    handleSubmit = (signinUser) => (event) => {
        event.preventDefault();
        signinUser().then(({ data: { signinUser: { token } } }) => {
            console.log(token);
            localStorage.setItem('token', token);
            this.clearState();
        });
    };

    handleChange = ({ target: { name, value }}) => this.setState({ [name]: value });

    clearState = () => this.setState({ ...initialState });

    render() {
        const { username, password } = this.state;
        return (
            <div className="App">
                <h2>Signin</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { loading, error }) => (
                        <form className="form" onSubmit={this.handleSubmit(signinUser)}>
                            <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} />
                            <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} />
                            <button type="submit" disabled={loading || !username || !password} className="button-primary">Submit</button>
                            {error && <Error error={error} />}
                        </form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default Signin;