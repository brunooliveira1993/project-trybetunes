import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

export default class Favorites extends Component {
  state = {
    songsCheck: [],
    loading: false,
    renderPage: true,
  }

  componentDidMount() {
    this.favotiteSongsList();
  }

  favotiteSongsList = async () => {
    this.setState({ loading: true });
    const songsList = await getFavoriteSongs();
    this.setState({
      songsCheck: songsList,
      loading: false,
      renderPage: true,
    });
  }

  render() {
    const { loading, songsCheck, renderPage } = this.state;

    const favoriteSongs = async (event, music) => {
      this.setState({ loading: true });
      await removeSong(music);
      const arr = songsCheck;
      for (let index = 0; index < songsCheck.length; index += 1) {
        if (arr[index].trackId === music.trackId) {
          arr.splice(index, 1);
        }
      }
      return this.setState({ songsCheck: arr, loading: false });
    };

    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading && <Carregando />
        }
        {
          renderPage ? (
            <ul>
              {songsCheck.map((music, index) => (
                <li key={ index }>
                  { console.log(music.trackName)}
                  <p>{music.trackName}</p>
                  <audio data-testid="audio-component" src="{previewUrl}" controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ music.trackId }>
                    Favorita
                    <input
                      checked
                      type="checkbox"
                      onChange={ (event) => favoriteSongs(event, music) }
                      name="Favorita"
                      id={ music.trackId }
                      data-testid={ `checkbox-music-${music.trackId}` }
                    />
                  </label>
                </li>
              ))}
            </ul>
          ) : <Carregando />
        }
      </div>
    );
  }
}
