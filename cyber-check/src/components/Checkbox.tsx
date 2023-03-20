import React, { useState, useEffect, useMemo } from "react";
import { CheckBox, Icon } from "@rneui/themed";

interface Props {
  getCheckboxStatus: (checked: boolean, taskId: string) => void;
  taskId: string;
}

const Checkbox = ({ getCheckboxStatus, taskId }: Props) => {
  const [checked, setChecked] = useState(false);

  const sendData = () => {
    getCheckboxStatus(!checked, taskId);
  };

  return (
    <>
      <CheckBox
        iconType="material"
        uncheckedIcon="check-box-outline-blank"
        checkedIcon="check-box"
        checked={checked}
        onPress={() => {
          setChecked(!checked);
          sendData();
        }}
      />
    </>
  );
};

export default Checkbox;
