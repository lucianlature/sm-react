/**
 * Created by Lucian on 16/09/2016.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux'
import { Row, Col, Panel } from 'react-bootstrap';
import { loadCollections, fetchTopCollectionsIfNeeded } from '../actions';
import CollectionListItem from '../components/CollectionListItem';
import { StyleSheet, css } from 'aphrodite';
import { Table, Column, Cell } from 'fixed-data-table';
import { selectCollections } from '../reducer';


const redial = {
  fetch: ({ dispatch }) => dispatch(loadCollections())
};

const mapStateToProps = state => ({
  collections: selectCollections(state)
});

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toLocaleString()}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <Link to={`/collection/${data[rowIndex][col]}`}> {data[rowIndex][col]} </Link>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const CollectionListPage = ({ collections }) => (
  <div className='content-wrapper'>
    <Helmet title='Collections' />
    <section className='content-header'>
      <h1>Collections</h1>

      <ol className="breadcrumb">
        <li><a href='#'><i className='fa fa-dashboard'></i> Home</a></li>
        <li className='active'><a href='#'>Collections</a></li>
      </ol>
    </section>

    <section className='content'>
      <Row>
        <Col md={12}>
          <Panel header='Fixed Data Table'>
            <Table
              className='center-block'
              rowHeight={50}
              headerHeight={50}
              rowsCount={collections.data.length}
              width={800}
              height={500}>
              <Column
                header={<Cell>ID</Cell>}
                cell={<LinkCell data={collections.data} col="id" />}
                fixed={true}
                width={100}
              />
              <Column
                header={<Cell>Title</Cell>}
                cell={<TextCell data={collections.data} col="title" />}
                fixed={false}
                width={400}
              />
              <Column
                header={<Cell>Recipes</Cell>}
                cell={<TextCell data={collections.data} col="recipes" />}
                width={200}
              />
              <Column
                header={<Cell>Articles</Cell>}
                cell={<TextCell data={collections.data} col="articles" />}
                width={200}
              />
              <Column
                header={<Cell>Status</Cell>}
                cell={<TextCell data={collections.data} col="status" />}
                width={200}
              />
              <Column
                header={<Cell>Syndicated</Cell>}
                cell={<TextCell data={collections.data} col="syndicated" />}
                width={200}
              />
              <Column
                header={<Cell>Last Edited</Cell>}
                cell={<TextCell data={collections.data} col="last_edited" />}
                width={200}
              />
            </Table>
          </Panel>
        </Col>
      </Row>
    </section>
  </div>
);

CollectionListPage.PropTypes = {
  collections: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
});

export default provideHooks(redial)(connect(mapStateToProps)(CollectionListPage));
