import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    img: '',
    disable: true,
  }

  componentDidMount() {
    this.retorneUser();
  }

  verifyFunc = (validation) => {
    const { name, description, img } = this.state;
    const caracterCheck = validation;
    const caracterCheck1 = img.length !== 0;
    const caracterCheck2 = name.length !== 0;
    const caracterCheck3 = description.length !== 0;
    if (caracterCheck === true
      && caracterCheck1 === true
      && caracterCheck2 === true
      && caracterCheck3 === true) {
      return this.setState({ disable: false });
    }
  }

  updateUserFunc = async (event) => {
    event.preventDefault();
    const { name, email, description, img } = this.state;
    const obj = {
      name,
      email,
      image: img,
      description,
    };
    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({ loading: false });
    const { history } = this.props;
    return history.push('/profile');
  }

  validateEmail = (item) => {
    const email = /\S+@\S+\.\S+/;
    return (email.test(item));
  }

  onImputChange = (event) => {
    const { email } = this.state;
    const { name, value } = event.target;
    const emailValidation = this.validateEmail(email);
    this.setState({ [name]: value });
    this.verifyFunc(emailValidation);
  };

  retorneUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      img: user.image,
    });
  }

  render() {
    const { loading, disable, name, email, description, img } = this.state;

    const userRender = () => (
      <form>
        <label htmlFor="name">
          Nome:
          <br />
          <input
            type="text"
            data-testid="edit-input-name"
            id="name"
            value={ name }
            onChange={ this.onImputChange }
            name="name"
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <br />
          <input
            type="text"
            data-testid="edit-input-email"
            id="email"
            value={ email }
            onChange={ this.onImputChange }
            name="email"
          />
        </label>
        <br />
        <label htmlFor="descrição">
          Descrição:
          <br />
          <textarea
            type="text"
            data-testid="edit-input-description"
            id="descrição"
            value={ description }
            onChange={ this.onImputChange }
            name="description"
          />
        </label>
        <br />
        <label htmlFor="avatar">
          Foto de perfil:
          <br />
          <input
            type="text"
            data-testid="edit-input-image"
            id="avatar"
            value={ img }
            onChange={ this.onImputChange }
            name="img"
          />
        </label>
        <br />
        <button
          data-testid="edit-button-save"
          type="submit"
          disabled={ disable }
          onClick={ this.updateUserFunc }
        >
          Editar perfil
        </button>

      </form>
    );

    const renderLogin = userRender();

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          {
            loading && <Carregando />
          }
          {renderLogin}

        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
