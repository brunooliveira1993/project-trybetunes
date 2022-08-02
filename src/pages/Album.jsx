import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
    loading: false,
  }

  componentDidMount() {
    this.musics();
  }

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
                <MusicCard musics={ musics } />
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
