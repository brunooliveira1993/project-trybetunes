import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Profile extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    img: '',
  }

  componentDidMount() {
    this.retorneUser();
  }

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
    return console.log(user);
  }

  render() {
    const { loading } = this.state;

    const userRender = () => {
      const { name, email, description, img } = this.state;
      return (
        <div>
          <span>Nome:</span>
          <p>{name}</p>
          <span>Email:</span>
          <p>{email}</p>
          <span>Descrição:</span>
          <p>{description}</p>
          <span>Foto:</span>
          <img src={ img } data-testid="profile-image" alt="" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      );
    };

    const renderLogin = userRender();

    return (
      <div data-testid="page-profile">
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
