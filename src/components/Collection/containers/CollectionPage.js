/**
 * Created by Lucian on 18/09/2016.
 */

import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadCollection } from '../actions';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import NotFound from '../../../components/NotFoundPage';
import { selectCurrentCollection } from '../reducer'

const redial = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadCollection(id))
};

const mapStateToProps = state => selectCurrentCollection(state);

const CollectionPage = ({ slug, title, isLoading, error }) => {
  if (!error) {
    return (
      <div className='content-wrapper'>
        <Helmet title={title} />
        {isLoading &&
        <h2 className={css(styles.loading)}>Loading&hellip;</h2>
        }
        {!isLoading &&
        <section className="content">
          <h2 className={css(styles.slug)}>{slug}</h2>
          <p className={css(styles.content)}>{title}</p>
        </section>
        }
      </div>
    )
  } else {
    // maybe check for different types of errors and display appropriately
    return <NotFound />
  }
};

CollectionPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

const styles = StyleSheet.create({
  content: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '1rem 0',
    color: '#555'
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
});

export default provideHooks(redial)(connect(mapStateToProps)(CollectionPage));
