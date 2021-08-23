import React from "react";
import { Empty, Button } from "antd";
const NotFound = () => {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            Couldn't find your <a href="#API">Page</a>
          </span>
        }
      >
        <Button type="primary" href="/create">
          Create Now
        </Button>
      </Empty>
    </div>
  );
};
export default NotFound;
