import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
// import serialize from 'serialize-javascript';

export default class Html extends React.Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  get styles() {
    const { assets } = this.props;
    //const { styles, assets: _assets } = assets;
    //const stylesArray = Object.keys(styles);

    const headStyles = `
      html {
          box-sizing: border-box
      }
      *,
      *::before,
      *::after {
          box-sizing: border-box
      }
      html {
          font-size: 100%;
          -ms-overflow-style: scrollbar;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          height: 100%;
      }
      body {
          font-size: 1rem;
          background-color: #fff;
          color: #555;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
          margin: 0;
          padding: 0;
      }
      .bs-glyphicons {
          padding-left: 0;
          padding-bottom: 1px;
          margin-bottom: 20px;
          list-style: none;
          overflow: hidden;
      }
      .bs-glyphicons li {
          float: left;
          width: 25%;
          height: 115px;
          padding: 10px;
          margin: 0 -1px -1px 0;
          font-size: 12px;
          line-height: 1.4;
          text-align: center;
          border: 1px solid #ddd;
      }
      .bs-glyphicons .glyphicon {
          margin-top: 5px;
          margin-bottom: 10px;
          font-size: 24px;
      }
      .bs-glyphicons .glyphicon-class {
          display: block;
          text-align: center;
          word-wrap: break-word;
          /* Help out IE10+ with class names */
      }
      .bs-glyphicons li:hover {
          background-color: rgba(86, 61, 124, .1);
      }
      @media (min-width: 768px) {
          .bs-glyphicons li {
              width: 12.5%;
          }
      }
    `;

    /*
    // styles (will be present only in production with webpack extract text plugin)
    if (stylesArray.length !== 0) {
      return stylesArray.map((style, i) =>
        <link href={assets.styles[style]} key={i} rel="stylesheet" type="text/css" media="screen, projection" charSet="UTF-8" />
      );
    }

    // (will be present only in development mode)
    // It's not mandatory but recommended to speed up loading of styles
    // (resolves the initial style flash (flicker) on page load in development mode)
    const scssPaths = Object.keys(_assets).filter(asset => asset.includes('.css'));
    return scssPaths.map((style, i) =>
      <style dangerouslySetInnerHTML={{ __html: _assets[style]._style }} key={i} />
    );
    */

    return (<style dangerouslySetInnerHTML={{ __html: headStyles }} />);
  }

  // TODO: Find a better way to include conditional comments in HTML using JSX
  get comments() {
    return `
      <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->   
    `;
  }

  render() {
    const { assets, preloadedData, component } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const preloadedState = JSON.stringify({}/*store.getState()*/);

    return (
      <html lang="en-us">
        <head>
          <Helmet />
          { head.title.toComponent() }
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          { this.styles }
        </head>
        <body className="hold-transition skin-blue sidebar-mini">
            <div id="root" dangerouslySetInnerHTML={ { __html: content } } />
            <script id="preloaded-data" type="application/json" dangerouslySetInnerHTML={ { __html: preloadedData } } />
            <script id="preloaded-state" type="application/json" dangerouslySetInnerHTML={ { __html: preloadedState } } />
            <script key="dlls__vendor" src="/dll/dll.vendor.js" />
            <script async key="app" src={ "/build/" + assets.js[0] } charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
