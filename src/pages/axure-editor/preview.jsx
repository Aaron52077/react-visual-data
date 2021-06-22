import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { AutonContainer, Scrollbar } from "~components";
import { AxureScreenParser } from "~renderer";
import { useDocumentTitle } from "~common/hooks";
import storage from "~utils/storage";

function PanelPreview(props) {
  let schemaConfig = JSON.parse(storage.getLocal("schema_screen_config") || {});
  const {
    backgroundMode,
    backgroundColor,
    backgroundImage,
    backgroundDefine,
    zoom,
    backgroundOpacity,
    backgroundBlur,
    width,
    height
  } = schemaConfig.page;
  useDocumentTitle(`DataV Pro - ${schemaConfig.page.name || "未命名"}`);

  useEffect(() => {
    props.dispatch({ type: "component/mode", data: "preview" });
    return () => {
      storage.clear();
    };
  }, []);

  const backgroundStyles = useMemo(() => {
    if (backgroundMode === "custom") {
      return backgroundImage ? `url(${backgroundImage}) 0% 0% / 100% 100%` : backgroundColor;
    }

    if (backgroundMode === "define") {
      return `url(./static/templet/${backgroundDefine}) 0% 0% / 100% 100%`;
    }

    return backgroundColor ? backgroundColor : null;
  }, [backgroundMode, backgroundImage, backgroundDefine, backgroundColor]);

  const containerStyles = {
    background: backgroundStyles,
    filter: `blur(${backgroundBlur}px)`,
    opacity: parseFloat(backgroundOpacity / 10)
  };

  return (
    <Scrollbar>
      <AutonContainer style={{ width, height }} zoom={zoom}>
        <div className="bg-container" style={containerStyles} />
        <AxureScreenParser widgets={schemaConfig.components} />
      </AutonContainer>
    </Scrollbar>
  );
}

export default connect((state) => state.component)(PanelPreview);
