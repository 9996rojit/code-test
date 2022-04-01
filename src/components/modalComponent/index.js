import { notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext } from "react";
import { ToggleContext } from "../../utils/context/ToggleContext";

const openNotification = () => {
  notification.success({
    message: "Analyze successFully",
    description:
      "Analyze successFully",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const ModelComponent = ({ onCancel }) => {
  const context = useContext(ToggleContext)
  const  { toggle, setToggle } = context;
  const handlerOk=() => {
    setToggle(false)
    openNotification()
  }
  return (
    <Modal
      title="Basic Modal"
      visible={toggle}
      onOk={handlerOk}
      onCancel={onCancel}
    >
      <p>Are you sure you want to continue?</p>
    </Modal>
  );
};

export default ModelComponent;
