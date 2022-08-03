import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    renderPage: false,
    loading: false,
    songsCheck: [],
  }

  componentDidMount() {
    this.favotiteSongsList();
  }

  favotiteSongsList = async () => {
    const songsList = await getFavoriteSongs();
    this.setState({
      songsCheck: songsList,
      loading: false,
      renderPage: true,
    });
  }

  render() {
    const { loading, songsCheck, renderPage } = this.state;
    const { musics } = this.props;

    const favoriteSongs = async (event, music) => {
      if (songsCheck.some((song) => song.trackId === music.trackId)) {
        this.setState({ loading: true });
        await removeSong(music);
        const arr = songsCheck;
        event.target.checked = false;
        for (let index = 0; index < songsCheck.length; index += 1) {
          if (arr[index].trackId === music.trackId) {
            arr.splice(index, 1);
          }
        }
        return this.setState({ songsCheck: arr, loading: false });
      }
      event.target.checked = true;
      this.setState(({ loading: true }));
      const favoriteSong = await addSong(music);
      this.setState((preventState) => ({
        songsCheck: [...preventState.songsCheck, music],
        loading: false,
      }));
      return favoriteSong;
    };

    return (
      <div>
        {
          loading && <Carregando />
        }
        {
          renderPage ? (
            <ul>
              {musics.slice(1).map((music, index) => (
                <li key={ index }>
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
                      checked={ songsCheck.some((song) => song.trackId
                        === music.trackId) }
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

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
};
