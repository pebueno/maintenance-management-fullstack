import React from "react";
import CompanyForm from "../Forms/CompanyForm";
import AssetForm from "../Forms/AssetForm";
import UnitForm from "../Forms/UnitForm";

import UserForm from "../Forms/UserForm";
import { Collapse, PageHeader } from "antd";

const { Panel } = Collapse;
const CreatePage = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Create"
        subTitle="Choose one of the following options avaible"
      />
      <Collapse accordion>
        <Panel header="Create Company" key="1">
          <CompanyForm />
        </Panel>
        <Panel header="Create Unit" key="2">
          <UnitForm />
        </Panel>
        <Panel header="Create User" key="3">
          <UserForm />
        </Panel>
        <Panel header="Create Asset" key="4">
          <AssetForm />
        </Panel>
      </Collapse>
    </>
  );
};
export default CreatePage;
