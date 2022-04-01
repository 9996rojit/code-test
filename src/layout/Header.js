import React from "react";
import { Avatar, Layout } from "antd";
import "./layout.css";

const { Header, Content } = Layout;
const Menu = ({ children }) => {
  return (
    <Layout>
      <Header className="header display-flex justify-content-space-between">
        <div className="text-bold-color-style font24">Biological Hazard</div>
        <div className="display-flex itemCenter">
          <div className="font14 text-color mr-10">tech</div>
          <Avatar size="small" />
        </div>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 100,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default Menu;
