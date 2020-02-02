import React from 'react';
import { Tabs } from 'antd';
import './App.css';
import { HierarchicalVirusMapDemo } from './pages/hierarchicalVirusMapDemo';
import { InformationMapDemo } from './pages/informationMapDemo';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey='virus'>
          <Tabs.TabPane tab='疫情地图' key='virus'>
            <div style={{ width: '100vw', height: '90vh' }}>
              <HierarchicalVirusMapDemo />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='通用地图' key='information'>
            <div style={{ width: '100vw', height: '90vh' }}>
              <InformationMapDemo />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
