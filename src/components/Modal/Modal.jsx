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
  handleKeyUp = e => {
    if (e.key == 'Escape') this.closeModal();
  };
  closeModal = () => {
    this.props.stateUpdate('modalIndex', '-1');
  };

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={this.props.url} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}