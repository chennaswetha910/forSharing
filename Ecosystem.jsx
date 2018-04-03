import React, { Component } from 'react';
import { Tabs, Table, Collapse } from 'antd';
import 'antd/dist/antd.css';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const ECOSYSTEMJSON = [
  {
    'ecosystemName': 'Wire Ecosystem',
    'ecosystemItems': [
      {
      'appType': 'Core Wires Apps',
      'appItems': [
          { 'appName': 'Dept Scan', 'selected': true },
          { 'appName': 'Fed payment network', 'selected': false },
          { 'appName': 'Global oney Transfer System', 'selected': true }
        ]
      }, {
      'appType': 'Peripheral Wires Apps',
      'appItems' : [
          { 'appName': 'Dept Scan1', 'selected': true },
          { 'appName': 'Fed payment network1', 'selected': false },
          { 'appName': 'Global Money Transfer System1', 'selected': true }
        ]
      }
    ]
  },
  {
    'ecosystemName': 'ACH Ecosystem',
    'ecosystemItems': [
      {
      'appType': 'Core Wires Apps - ACH',
      'appItems': [
          { 'appName': 'Dept Scan - ACH', 'selected': true },
          { 'appName': 'Fed payment network - ACH', 'selected': false },
          { 'appName': 'Global oney Transfer System - ACH', 'selected': true }
        ]
      }, {
      'appType': 'Pripheral Wires Apps - ACH',
      'appItems' : [
          { 'appName': 'Dept Scan1 - ACH', 'selected': true },
          { 'appName': 'Fed payment network1 - ACH', 'selected': false },
          { 'appName': 'Global Money Transfer System1 - ACH', 'selected': true }
        ]
      }
    ]
  }
];

class Ecosystem extends Component { 
  constructor(props) {
    super(props);
  }

  getEcosystemData() {

    let ecoSystems = [];
    let ecoAppNames = [];
    let tabPanes = [];

    ECOSYSTEMJSON.map((ecosystem, ecosystemIndex) => { //Accordion

      
      ecoAppNames = [];
      tabPanes = [];

      ecosystem.ecosystemItems.map((ecoItems, ecoItemsIndex) => { //Tabs

        let appsArr = [];
        ecoItems.appItems.map((apps, appsIndex) => { //Table

          
          appsArr.push({'appName': apps.appName, 'key': appsIndex+1});

        })

        const columns = [{
                          title: 'App Name',
                          dataIndex: 'appName'
                        }];

        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.appName === 'Disabled User', // Column configuration not to be checked
            appName: record.appName,
          })
        };

        console.log(appsArr);

        //const paneContent = 'hello';
        const paneContent = <Table rowSelection={rowSelection} columns={columns} dataSource={appsArr} />;

        tabPanes.push({
          title: ecoItems.appType,
          content: paneContent,
          key: ecoItemsIndex+1
        })
      })

      const finalPanes = tabPanes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)

      ecoAppNames.push(<Tabs type="card">
                          {finalPanes}
                       </Tabs>);

      ecoSystems.push(<Panel 
                        header={ecosystem.ecosystemName}
                        key={ecosystemIndex+1}
                        >
                          {ecoAppNames}
                        </Panel>);

    })
    return ecoSystems;

  }

  render () {
    const content = this.getEcosystemData();
    return (
      <div>
        <Collapse defaultActiveKey={['1']} accordion>
          {content}
        </Collapse>
      </div>
    )
  }

 }

 export default Ecosystem;
