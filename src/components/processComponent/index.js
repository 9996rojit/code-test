import { Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const ProcessComponent = ({ index }) => {
  const { Option } = Select;
  return (
    <>
      <span style={{marginRight:"5px"}}>Process </span> <PlusOutlined style={{color:'green',border:"1px solid black"}} onClick={()=>{}} /> 
      <Select
        style={{ width: 100 }}
        onChange={(e) => {
          console.log(e);
        }}
        defaultValue={index === 0 ? "1" : ""}
      >
        <Option value="1">Irradiation</Option>
        <Option value="2">Heat treatment</Option>
        <Option value="3">Steam</Option>
        <Option value="4">Hot ethanol</Option>
        <Option value="5">Drying</Option>
        <Option value="6">Organic acids</Option>
        <Option value="7">Pasteurization</Option>

      </Select>
    </>
  );
};

export default ProcessComponent;
