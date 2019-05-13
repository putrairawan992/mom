import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

class DashboardContainer extends PureComponent {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Need Response" key="1">
          Need Response
        </TabPane>
        <TabPane tab="Need Purchase" key="2">
          Need Purchase
        </TabPane>
        <TabPane tab="Purchased" key="3">
          Purchased
        </TabPane>
        <TabPane tab="Ready" key="4">
          Ready
        </TabPane>
        <TabPane tab="Fowarded to Ekspedition" key="5">
          Fowarded to Ekspedition
        </TabPane>
      </Tabs>
    );
  }
}

DashboardContainer.propTypes = {};

export default DashboardContainer;
