import React from "react";

const VHtml = ({ value, defaultValue }) => {
  let __html = "";
  try {
    __html = value ? value : defaultValue;
    if (typeof __html !== "string") {
      __html = "";
    }
  } catch (error) {}
  return <div dangerouslySetInnerHTML={{ __html }} />;
};

export default VHtml;
