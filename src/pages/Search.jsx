import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    disabled: true,
    search: '',
    loading: false,
    arr: [],
    artistSearch: '',
    resultEnable: false,
    notFound: false,
  }

  onImputChange = (event) => {
    const caracterNumber = 2;
    let caracterCheck = true;
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { search } = this.state;
      if (search.length >= caracterNumber) {
        caracterCheck = false;
      }
      this.setState({ disabled: caracterCheck });
    });
  };

  render() {
    const { disabled, loading, search, arr, artistSearch,
      resultEnable, notFound } = this.state;

    const searchApi = async (event) => {
      event.preventDefault();
      this.setState({
        loading: true,
        artistSearch: `Resultado de álbuns de: ${search}`,
      });
      const albumList = await searchAlbumsAPI(search);
      if (albumList.length === 0) {
        this.setState({
          search: '',
          notFound: true,
          loading: false,
        });
      } else {
        this.setState({
          search: '',
          loading: false,
          arr: albumList,
          resultEnable: true,
        });
        return albumList;
      }
    };

    const renderList = arr.map((album) => (
      <ol key={ album.collectionId }>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <li>
            <p>{album.artistName}</p>
            <img src={ album.artworkUrl100 } alt="" />
            <p>{album.collectionName}</p>
          </li>
        </Link>
      </ol>
    ));

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Carregando />
            : (
              <div>
                <label htmlFor="search">
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    placeholder="Pesquisar"
                    name="search"
                    onChange={ this.onImputChange }
                    value={ search }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ disabled }
                  onClick={ searchApi }
                >
                  Pesquisar
                </button>
              </div>
            )
        }
        <div>
          {
            notFound && (
              <p>
                Nenhum álbum foi encontrado
              </p>
            )
          }
          {
            resultEnable && (
              <div>
                <p>
                  {artistSearch}
                </p>
                <ol>
                  {renderList}
                </ol>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
