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
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitHandle}>
          <button type="submit" className={css.button}>
            <span className={css.label}>🔍</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            value={this.props.query}
            onInput={this.inputHandle}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
