import * as React from 'react';
import { Route,Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchChannel from './components/FetchChannel';
import './custom.css'

export default () => (
    <Layout>
        <Switch>
            {/*site home page*/}
            <Route exact path='/' component={Home} />
            {/*old-sandbox*/}
            <Route path='/counter' component={Counter} />
            {/*user channel :channel*/}
            <Route path='/:channel' component={FetchChannel} />
        </Switch> 
    </Layout>
);
