import React, { useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { AxureGridParser } from "~renderer";
import { Scrollbar } from "~components";
import { useDocumentTitle } from "~common/hooks";
import storage from "~utils/storage";

function PanelPreview(props) {
  let schemaConfig = JSON.parse(storage.getLocal("schema_report_config") || {});
  const {
    name,
    backgroundMode,
    backgroundColor,
    backgroundImage,
    backgroundDefine,
    backgroundOpacity,
    backgroundBlur
  } = schemaConfig.page;
  useDocumentTitle(`DataV Pro - ${name || "未命名"}`);

  const backgroundStyles = useMemo(() => {
    if (backgroundMode === "custom") {
      return backgroundImage ? `url(${backgroundImage}) 0% 0% / 100% 100%` : backgroundColor;
    }

    if (backgroundMode === "define") {
      return `url(./static/templet/${backgroundDefine}) 0% 0% / 100% 100%`;
    }

    return backgroundColor ? backgroundColor : null;
  }, [backgroundMode, backgroundImage, backgroundDefine, backgroundColor]);

  useEffect(() => {
    props.dispatch({ type: "component/mode", data: "preview" });
    return () => {
      storage.clear();
    };
  }, []);

  return (
    <>
      <div
        className="bg-container"
        style={{
          background: backgroundStyles,
          filter: `blur(${backgroundBlur}px)`,
          opacity: parseFloat(backgroundOpacity / 10)
        }}
      />
      <Scrollbar>
        <AxureGridParser dataGrid={schemaConfig.components} />
      </Scrollbar>
    </>
  );
}

export default connect((state) => state.component)(PanelPreview);
