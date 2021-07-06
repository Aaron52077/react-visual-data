import React, { useMemo } from "react";
import { DatePicker, TimePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import { getFormat } from "@/form-render/utils";

const dateHoc = (props, onChange, DateComponent) => {
  const { format = "dateTime" } = props.schema;
  const dateFormat = getFormat(format);

  const styles = useMemo(() => {
    return props.invalid ? { borderColor: "#ff4d4f" } : {};
  }, [props.invalid]);

  let rootValue = props.value || "";
  if (rootValue) {
    rootValue = moment(props.value, dateFormat);
  }

  const dateParams = {
    ...props.options,
    style: { width: "100%", ...styles },
    picker: ["date", "week", "month", "quarter", "year"].includes(format) ? format : "date",
    disabled: props.disabled,
    showTime: format === "dateTime",
    value: rootValue,
    onChange
  };

  return <DateComponent {...dateParams} locale={locale} />;
};

const VDatePicker = (props) => {
  const { format = "dateTime" } = props.schema;
  const onChange = (value, string) => props.onChange(props.name, string);
  const DateComponent = format === "time" ? TimePicker : DatePicker;
  return dateHoc(props, onChange, DateComponent);
};

export default VDatePicker;
