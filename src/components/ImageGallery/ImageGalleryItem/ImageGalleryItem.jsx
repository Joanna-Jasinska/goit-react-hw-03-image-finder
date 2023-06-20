import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    id: 'no id',
    miniature: 'no miniature',
    url: 'no url',
    alt: 'no alt',
  };

  render() {
    return (
      <li
        className="ImageGalleryItem gallery-item"
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <img
          src={this.props.miniature}
          className="ImageGalleryItem-image"
          alt={this.props.alt}
        />
      </li>
    );
  }
}
