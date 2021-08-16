import React from "react";

import { Layout } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      Made with <HeartTwoTone twoToneColor="#FF3333" /> in Sao Paulo
    </Layout.Footer>
  );
};

export default Footer;
