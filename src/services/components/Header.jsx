import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  state = {
    loginName: '',
    loading: true,
  }

  async componentDidMount() {
    const loginName = await getUser('name');
    this.setState(
      {
        loginName: loginName.name,
        loading: false,
      },
    );
  }

  render() {
    const { loginName, loading } = this.state;

    return (
      <div data-testid="header-component">
        {
          loading ? <Carregando /> : <p data-testid="header-user-name">{loginName}</p>
        }
        {
          loading
        }
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </div>
    );
  }
}
