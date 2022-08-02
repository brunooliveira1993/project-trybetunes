import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../services/components/Carregando';

export default class Login extends Component {
  state = {
    loading: false,
    disabled: true,
    login: '',
  }

  apiCall = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { login } = this.state;
    const obj = {
      name: login,
    };
    await createUser(obj);
    const { history } = this.props;
    return history.push('search');
  };

  onImputChange = (event) => {
    const caracterNumber = 3;
    let caracterCheck = true;
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { login } = this.state;
      if (login.length >= caracterNumber) {
        caracterCheck = false;
      }
      this.setState({ disabled: caracterCheck });
    });
  };

  render() {
    const { loading, disabled } = this.state;

    return (
      <div data-testid="page-login">
        Login
        <section>
          {
            loading && <Carregando />
          }
        </section>
        <main>
          <form action="">
            <label htmlFor="Name">
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Name"
                onChange={ this.onImputChange }
                name="login"
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              onClick={ this.apiCall }
              disabled={ disabled }
            >
              Entrar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
