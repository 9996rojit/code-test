import React, { useEffect, useState,useContext } from "react";
import { Table, Button, Checkbox, Select, Spin, Alert, Form, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProcessComponent from "../processComponent";
import ModelComponent from "../modalComponent";
import { ToggleContext } from "../../utils/context/ToggleContext";
import {jsonToRequired} from "../../utils/DataFormatter"



const TableComponent = () => {
  const {Option} = Select
  const [data, setData] = useState();
  const context = useContext(ToggleContext)
  const  { toggle, setToggle } = context;
  
  const [loading, setLoading] = useState(true);
  
  const addRowHandler = (index,record) => {
    const tempData = {
      RecipeCategoryId: record.RecipeCategoryId,
      RecipeSubCategoryId: record.RecipeSubCategoryId,
      BiologicalHazardId: record.BiologicalHazardId,
      CategoryTitle: record.CategoryTitle,
      RecipeSubCategoryTitle: record.RecipeSubCategoryTitle,
      BiologicalHazardTitle: record.BiologicalHazardTitle,
      IsExists: record.IsExists,
      Status: record.Status,
      IngredientName: record.IngredientName,
      RecipeClientDetailId: record.RecipeClientDetailId,
      IngredientId: record.IngredientId,
    };
    const tempArray = [...data];
    tempArray.splice(index + 1, 0, tempData);
    setData(tempArray);
  };
  
  const fetchDataFromApi = async () => {
    const response = await fetch("/sampleData.json");
    const jsonData = await response.json();
    setData(jsonToRequired(jsonData));
    setLoading(false)
  };
  useEffect(() => {
    fetchDataFromApi();
  }, []);
  
  const columns = [
    {
      title: "INGREDIENT NAME",
      dataIndex: 'IngredientName',
      width:100,
      key:"IngredientId"
    },
    {
      title: "CATEGORY",
      dataIndex: "CategoryTitle",
      key: "2",
      width: 100,
    },
    {
      title: "SUBCATEGORY",
      dataIndex: "RecipeSubCategoryTitle",
      key: "3",
      width: 100,
    },
    {
      title: "BIOLOGICALHAZARD",
      dataIndex: "BiologicalHazard",
      key: "4",
      width: 100,
      render:(text,record,index)=>{
        return text?.map((item,index)=>{
          return item?.BiologicalHazardTitle
        })
      }
    },
    {
      title: "HAZARD ADDRESSED BY SUPPLIER",
      key: "5",
      width: 100,
      render: () => <Checkbox checked={"IsExists"} />,
    },
    {
      title: "",
      key: "12",
      width: 100,
      render: (_, record, index) => {
        return (
          <PlusOutlined
          style={{ color: "green" }}
          onClick={() => addRowHandler(index,record)}
          />
          );
        },
      },
      {
        title: "PROCESS",
        dataIndex: "RecipeSubCategoryTitle",
        key: "6",
        width: 100,
        render: (_, record, index) => <ProcessComponent index={index} />,
      },
    {
      title: "MIN UNITS",
      dataIndex: "RecipeSubCategoryTitle",
      key: "7",
      width: 100,
      render: (text,record,index) => (
        <div style={{display: 'flex'}}>
        <Form.Item 
        name={record?.IngredientId+index}
        rules={[{
          type:'integer',
          min:160,
          max:180,
          
          message:"please enter range between 160 and 180"
        }]}
      >
          <InputNumber 
          controls={false}
          maxLength={3}
          style={{width:70,marginRight: "5px" }}
          /> 
        </Form.Item>
        <label><sup>o</sup>F</label>
        </div> 
        ),
    },
    {
      title: "MAX UNITS",
      dataIndex: "RecipeSubCategoryTitle",
      key: "8",
      width: 100,
      render: (text,record,index) => (
        <div style={{display: 'flex'}}>
        <Form.Item 
        name={text+index}
        rules={[{
          type:'integer',
          min:160,
          max:180,
          
          message:"please enter range between 160 and 180"
        }]}
      >
          <InputNumber 
          controls={false}
          maxLength={3}
          style={{width:70,marginRight: "5px" }}
          /> 
        </Form.Item>
        <label><sup>o</sup>F</label>
        </div> 
        ),
    },
    {
      title: "DURATION",
      dataIndex: "RecipeSubCategoryTitle",
      key: "9",
      width: 100,
      render: (text,record,index) => (
        <>
        <Form.Item 
        name={index}
        rules={[{
          type:'integer',
          min:1,
          max:60,
          message:"please enter range between 1 and 60"
        }]}
      >
        <InputNumber controls={false} style={{width:70,marginRight: "5px" }}/>
      </Form.Item>
      
      </>
      )
    },
    {
      title: "INTERVAL",
      dataIndex: "RecipeSubCategoryTitle",
      key: "11",
      width: 100,
      render: () => (
        <Select
        style={{ width: 100 }}
        onChange={(e) => {
          console.log(e);
        }}
        defaultValue={ "1"}
        >
        <Option value="1">second</Option>
        <Option value="2">Minute</Option>
        <Option value="3">Hour</Option>
      </Select>
      ),
    },
    {
      title: "ANALYZE",
      dataIndex: "RecipeSubCategoryTitle",
      key: "9",
      fixed: "right",
      width: 100,
      render: () => (
        <>
          <Button
            style={{ background: "darkblue", color: "white" }}
            onClick={() => setToggle(true)}
            >
            ANALYZE
          </Button>
        </>
      ),
    },
  ];
 
  return (
    <>
    {loading?
    (
      <Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  </Spin>
    ):
      (
      <Form>
        <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        pagination={false}
        sticky
      />
      <ModelComponent
        onCancel={() => {
          setToggle(false);
        }}
      />
      </Form>)
    }
    </>
  );
};
export default TableComponent;
