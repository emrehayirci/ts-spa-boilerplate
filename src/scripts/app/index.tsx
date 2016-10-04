import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import customHistory from './History.ts';

import { Services } from './utils/Services.ts';
import { PageManager } from './PageManager.ts';

import { Main } from './Main/Main.tsx';
import { NotFound } from './Main/components/NotFound.tsx';
import { Home } from './Main/components/Home.tsx';
import { EntriesByProperty } from './Main/components/EntriesByProperty.tsx';
import { EntriesByTag } from './Main/components/EntriesByTag.tsx';
import { Pages } from './Main/components/Pages.tsx';
import { PageByName } from './Main/components/PageByName.tsx';

function render() {
    ReactDOM.render(
        <Router history={customHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="properties/:property/:value" component={EntriesByProperty} />
                <Route path="tags/:tag" component={EntriesByTag} />
                <Route path="pages" component={Pages} />
                <Route path="pages/:name" component={PageByName} />
                <Route path="*" component={NotFound} status={404} />
            </Route>
        </Router>,
        document.getElementsByTagName('app')[0]
    );
}

export function init() {
    console.log('p', Date.now());
    PageManager.prefetchUrl();
    render();
}
