import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

// to do: proptypes, other repo re-copy component + local save

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = `37527059-e422356509d98ede2a3340a26`;
const PER_PAGE = 12;
const Q_SETTINGS = `&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
// const link = `https://pixabay.com/api/?q=${'cat'}&page=${'1'}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      modalIndex: '-1',
      loading: false,
      loadingMore: false,
      query: '',
      page: 1,
      hits: 0,
      scroll: 0,
      querySettings: Q_SETTINGS,
    };
  }
  clearGallery = () => {
    this.setState({ error: '', page: 1, hits: 0, gallery: [] });
  };
  stateUpdate = (key, value) => {
    this.setState({ [key]: value });
  };
  convertResponseIntoGallery = response => {
    if (!response.data.hits) return [];
    return response.data.hits.map(hit => ({
      id: hit.id,
      miniature: hit.webformatURL,
      url: hit.largeImageURL,
      tags: hit.tags,
    }));
  };
  componentDidUpdate() {
    if (this.state.page > 1) {
      window.scrollTo(0, this.state.scroll);
    }
  }
  saveScrollPosition = () => {
    const y = Math.floor(
      document.documentElement.scrollTop || document.body.scrollTop
    );
    this.setState({ scroll: y });
  };

  async componentDidMount() {
    await this.newGallery();
  }

  componentDidCatch(error) {
    console.log(`App component did catch`);
    console.log(error);
    this.setState({ error: error });
  }

  async fetchData(q = this.state.query, page = this.state.page) {
    return await axios.get(`?q=${q}&page=${page}${this.state.querySettings}`);
  }
  async newGallery() {
    this.clearGallery();
    await this.setState(prev => {
      return { loading: true };
    });
    const response = await this.fetchData();
    this.setState({
      response: response,
      loading: false,
      gallery: this.convertResponseIntoGallery(response),
      hits: Number(response.data.totalHits),
    });
    return true;
  }
  async loadMoreGallery() {
    this.saveScrollPosition();
    await this.setState(prev => {
      return { loadingMore: true, page: 1 + Number(prev.page) };
    });
    const response = await this.fetchData();
    this.setState(prev => {
      return {
        response: response,
        loadingMore: false,
        gallery: [
          ...prev.gallery,
          ...this.convertResponseIntoGallery(response),
        ],
      };
    });
    return true;
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? <Loader /> : ''}
        <Searchbar
          query={this.state.query}
          stateUpdate={this.stateUpdate.bind(this)}
          searchHandle={this.newGallery.bind(this)}
        />
        {Number(this.state.modalIndex) > -1 ? (
          <Modal
            {...this.state.gallery[this.state.modalIndex]}
            stateUpdate={this.stateUpdate.bind(this)}
          />
        ) : (
          ''
        )}
        {!this.state.loading && this.state.gallery.length > 0 ? (
          <ImageGallery
            gallery={this.state.gallery}
            stateUpdate={this.stateUpdate.bind(this)}
          />
        ) : (
          <span className="Message">No search results.</span>
        )}
        {this.state.error ? this.state.error : ''}
        {this.state.hits > Math.max(0, this.state.gallery.length) ? (
          this.state.loadingMore ? (
            <Loader small={true} />
          ) : (
            <Button txt="Load more" onClick={this.loadMoreGallery.bind(this)} />
          )
        ) : (
          ''
        )}
      </div>
    );
  }
}