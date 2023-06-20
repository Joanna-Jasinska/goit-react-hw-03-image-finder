import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    url: 'no url',
    alt: 'no alt',
  };
  closeModal = () => {
    this.props.stateUpdate('modalIndex', '-1');
  };

  render() {
    return (
      <div class="Overlay" onClick={this.closeModal}>
        <div class="Modal">
          <img src={this.props.url} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
