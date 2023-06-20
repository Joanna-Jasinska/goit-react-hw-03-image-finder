import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

//to do: modal close, loader, load more,

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const KEY = `37527059-e422356509d98ede2a3340a26`;
const PER_PAGE = 12;
const link = `https://pixabay.com/api/?q=${'cat'}&page=${'1'}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
// id - unikalny identyfikator
// webformatURL - odnośnik do miniatury dla listy obrazków
// largeImageURL - odnośnik do dużej wersji dla okna modalnego
export class App extends Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      modalIndex: '-1',
      loading: false,
      querry: '',
      page: 1,
      querrySettings: `&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`,
    };
  }
  clear = () => {
    this.setState({ error: '', page: '1' });
  };
  stateUpdate = (key, value) => {
    this.setState({ [key]: value });
  };
  convertResponseIntoGallery = response => {
    console.log(`App response: (during converting)`);
    console.log(response);
    if (!response.data.hits) return [];

    console.log(`App converting response into:`);
    console.log(
      response.data.hits.map(hit => ({
        id: hit.id,
        format: hit.webformatURL,
        url: hit.largeImageURL,
        tags: hit.tags,
      }))
    );
    return response.data.hits.map(hit => ({
      id: hit.id,
      miniature: hit.webformatURL,
      url: hit.largeImageURL,
      tags: hit.tags,
    }));
  };
  async componentDidMount() {
    await this.setGallery();
  }
  componentDidCatch(error) {
    console.log(`App component did catch`);
    console.log(error);
    this.setState({ error: error });
  }
  // async componentDidUpdate() {
  //   // await this.setGallery();
  // }

  // async fetchData() {
  //   this.setState({ loading: true });
  //   return await axios.get(
  //     `?q=${this.state.querry}&page=${this.state.page}${this.state.querrySettings}`
  //   );
  // }
  async setGallery() {
    this.clear();
    console.log(`App setGallery()`);
    this.setState({ loading: true });
    const response = await axios.get(
      `?q=${this.state.querry}&page=${this.state.page}${this.state.querrySettings}`
    );
    this.setState({
      response: response,
      loading: false,
      gallery: this.convertResponseIntoGallery(response),
    });
    console.log(`App setGallery() - FINISHED`);
    return true;
  }

  render() {
    return (
      <div className="app">
        <Searchbar
          querry={this.state.querry}
          stateUpdate={this.stateUpdate.bind(this)}
          searchHandle={this.setGallery.bind(this)}
        />

        {this.state.loading ? 'loading...' : ''}
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
          'No search results'
        )}
        {this.state.error ? this.state.error : ''}
      </div>
    );
  }
}
