import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    const { musics } = this.props;

    const favoriteSongs = async (event) => {
      event.target.checked = true;
      this.setState({ loading: true });
      const favoriteSong = await addSong(musics);
      this.setState({
        loading: false,
      });
      return console.log(favoriteSong);
    };

    return (
      <div>
        {
          loading && <Carregando />
        }
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
                  type="checkbox"
                  onClick={ favoriteSongs }
                  name="Favorita"
                  id={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
              </label>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
};
