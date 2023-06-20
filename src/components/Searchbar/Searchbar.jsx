import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
  }
  inputHandle = e => {
    this.props.stateUpdate(e.target.name, e.target.value);
  };
  submitHandle = e => {
    e.preventDefault();
    this.props.searchHandle();
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.submitHandle}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="querry"
            value={this.props.querry}
            onInput={this.inputHandle}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
