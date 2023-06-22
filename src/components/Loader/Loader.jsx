import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Loader.module.css';

export const Loader = ({ small = false }) => {
  return (
    <>
      {small === true ? (
        <div className={`${css.spinner} ${css.small}`}>
          <div className={`${css.head} ${css.small}`}> </div>
        </div>
      ) : (
        <div className="Overlay">
          <div className={css.loader}>
            <div className={css.spinner}>
              <div className={css.head}> </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
