import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import IntlProvider from '../shared/i18n/IntlProvider.tsx';
import Html from './components/HTML.tsx';
import App from '../shared/App.tsx';

const serverRenderer = () => (req, res) => {
    const content = renderToString(
        <Provider store={req.store}>
            <Router location={req.url} context={{}}>
                <IntlProvider>
                    <App />
                </IntlProvider>
            </Router>
        </Provider>
    );

    const state = JSON.stringify(req.store.getState());

    return res.send(
        renderToString(
            <Html
                css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                state={state}
            >
                {content}
            </Html>
        )
    );
};

export default serverRenderer;