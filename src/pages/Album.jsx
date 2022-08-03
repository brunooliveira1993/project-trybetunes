import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    musics: [],
    loading: false,
    // alterações
    // songsCheck: [],
  }

  componentDidMount() {
    this.musics();
    // this.favotiteSongsList();
  }

  // alterações
  // favotiteSongsList = async () => {
  //   // this.setState({ loading: true });
  //   const songsList = await getFavoriteSongs();
  //   this.setState({
  //     songsCheck: songsList,
  //     // loading: false,
  //   });
  // }

  musics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const playList = await musicsAPI(id);
    this.setState({
      musics: playList,
      loading: true,
    });
  };

  render() {
    const { musics, loading } = this.state;

    // const favoriteSongs = async (event) => {
    //   console.log(event.target.id);
    //   const idMusic = event.target.id;
    //   // if (songsCheck.includes(idMusic)) {
    //   //   event.target.checked = false;
    //   //   return songsCheck.
    //   // }
    //   // console.log('nao contem');
    //   // event.target.checked = true;
    //   // this.setState(({ loading: false }));
    //   const favoriteSong = await addSong(idMusic);
    //   this.setState((preventState) => ({
    //     songsCheck: [...preventState.songsCheck, idMusic],
    //     // loading: true,
    //   }));
    //   return favoriteSong;
    // };

    return (
      <div data-testid="page-album">
        <Header />
        {
          loading && (
            <div>
              <h2 data-testid="artist-name">Artist Name</h2>
              <div>
                <img src={ musics[0].artworkUrl100 } alt="" />
                <p data-testid="album-name">Collection Name</p>
              </div>
              <div>
                <MusicCard
                  musics={ musics }
                  // songsCheck={ songsCheck }
                  // favoriteSong={ favoriteSongs }
                />
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
