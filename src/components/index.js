/* @remove-on-es-build-begin */
const ENV = process.env.NODE_ENV;
if (
  ENV !== "production" &&
  typeof console !== "undefined" &&
  console.warn && // eslint-disable-line no-console
  typeof window !== "undefined"
) {
  // eslint-disable-next-line no-console
  console.warn(
    "You are using a whole package of antd, " +
      "please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size."
  );
}
/* @remove-on-es-build-end */
export { default as AutoBreadcrumb } from "./auto-breadcrumb";

export { default as AutonContainer } from "./auto-container";

export { default as IconFont } from "./iconfont";

export { default as CustomToIframe } from "./iframe";

export { default as IFrameSimple } from "./iframe/simple";

export { default as AutoLoading } from "./auto-loading";

export { default as MonacoEditor } from "./monaco-editor";

export { default as Scrollbar } from "./scrollbar";

export { default as SketchRuler } from "./sketch-ruler";

export { default as Typing } from "./typing";

export { default as Vcharts } from "./vcharts";

export { default as SplitPanel } from "./split-panel";
