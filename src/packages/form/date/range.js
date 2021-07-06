import React from "react";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { getFormat } from "@/form-render/utils";

function rangeHoc(props, onChange, RangeComponent) {
  const { value } = props;
  const { format = "dateTime" } = props.schema;
  const dateFormat = getFormat(format);

  let defaultObj = {};
  if (value && Array.isArray(value) && value[0] && value[1]) {
    defaultObj = {
      defaultValue: [moment(props.value[0], dateFormat), moment(props.value[1], dateFormat)]
    };
  }

  const dateParms = {
    ...props.options,
    ...defaultObj,
    style: { width: "100%" },
    showTime: format === "dateTime",
    disabled: props.disabled,
    onChange
  };

  return <RangeComponent {...dateParms} locale={locale} />;
}

const { RangePicker } = DatePicker;

const VdateRange = (props) => {
  const onChange = (value, string) => props.onChange(props.name, string);
  return rangeHoc(props, onChange, RangePicker);
};

export default VdateRange;
