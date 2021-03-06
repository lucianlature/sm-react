/* @flow */

// React deps
import React from 'react';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import Helm from 'react-helmet'; // because we are already using helmet

// Relay deps
import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';
// import rootContainerProps from './rootContainerProps';
import render from './render';
import App from '../shared/universal/components/App';

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
export default async function universalReactAppMiddleware(ctx, next) {
  if (process.env.DISABLE_SSR === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = render();
    ctx.status = 200;
    ctx.body = html;
    return;
  }

  // First create a context for <ServerRouter>, which will allow us to
  // query for the results of the render.
  const context = createServerRenderContext();

  // Create the application react element.
  const app = (
    <ServerRouter
      location={ctx.request.url}
      context={context}
    >
      <App />
    </ServerRouter>
  );

  // Render the app to a string.
  const html = render(
    // Provide the full app react element.
    app
  );

  // Get the render result from the server render context.
  const renderResult = context.getResult();

  // Check if the render result contains a redirect, if so we need to set
  // the specific status and redirect header and end the response.
  if (renderResult.redirect) {
    ctx.status = 301;
    ctx.setHeader('Location', renderResult.redirect.pathname);
    ctx.end();
    return;
  }

  ctx.status = (
      renderResult.missed
        // If the renderResult contains a "missed" match then we set a 404 code.
        // Our App component will handle the rendering of an Error404 view.
        ? 404
        // Otherwise everything is all good and we send a 200 OK status.
        : 200
    );
  ctx.body = html;

  await next();
}