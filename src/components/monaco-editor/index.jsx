import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import MonacoEditor, { monaco } from "@monaco-editor/react";
import { converLayout } from "~utils/helper";
import Loading from "../auto-loading";

function CodePanel(props, ref) {
  const editorRef = useRef();
  const [code, setCode] = useState("// try to write code somewhere 😈 \n");
  let { value, width, height, readOnly = false, language = "json" } = props;

  // you can configure the locales
  monaco.config({ "vs/nls": { availableLanguages: { "*": "zh-cn" } } });

  useImperativeHandle(ref, () => ({
    getValue: () => JSON.parse(editorRef.current.getValue())
  }));

  useEffect(() => {
    try {
      setCode(JSON.stringify(value, null, 4));
    } catch (e) {
      // ignore
      throw new Error(e);
    }
  }, [value, language]);

  return (
    <MonacoEditor
      width={converLayout(width)}
      height={converLayout(height)}
      theme="dark"
      language={language}
      loading={<Loading />}
      value={code}
      options={{
        contextmenu: false,
        wrappingIndent: "deepIndent",
        readOnly: readOnly,
        automaticLayout: true,
        autoIndent: true,
        formatOnType: true,
        formatOnPaste: true,
        scrollBeyondLastLine: false,
        renderControlCharacters: false,
        minimap: {
          enabled: false
        }
      }}
      editorDidMount={(ev, editor) => {
        editorRef.current = editor;
      }}
    />
  );
}

export default forwardRef(CodePanel);
