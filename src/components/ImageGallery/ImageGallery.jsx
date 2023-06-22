import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    //   this.state = { ...INITIAL_STATE };
  }
  onClickHandle = i => {
    return e => {
      e.preventDefault();
      this.props.stateUpdate('modalIndex', i);
    };
  };
  render() {
    return (
      <ul className="ImageGallery gallery">
        {this.props.gallery.map((img, i) => (
          <ImageGalleryItem
            key={nanoid()}
            id={img.id}
            miniature={img.miniature}
            url={img.url}
            alt={img.tags}
            onClick={this.onClickHandle(i)}
          />
        ))}
      </ul>
    );
  }
}