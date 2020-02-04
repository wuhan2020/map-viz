import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { HierarchicalVirusMapDemo } from './pages/hierarchicalVirusMapDemo';
import { InformationMapDemo } from './pages/informationMapDemo';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <header className="navigator">
          <a className="item" href="#/">疫情地图组件</a>
          <a className="item" href="#/information">通用地图组件</a>
        </header>
        <div style={{ width: '100vw', height: '90vh' }}>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={HierarchicalVirusMapDemo} />
              <Route exact path="/information" component={InformationMapDemo} />
            </Switch>
          </HashRouter>
        </div>
        {/* <div style={{ width: '100vw', height: '90vh' }}>
          <InformationMapDemo />
        </div> */}
      </div >
    );
  }
}
