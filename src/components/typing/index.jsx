import React, { useRef, useEffect } from "react";
import Typing from "./core";

const TypingPrint = (props) => {
  const { source, delay = 30 } = props;

  const sourceEl = useRef();
  const outputEl = useRef();

  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: delay
    });
    typing.start();
  }, [delay]);

  return (
    <>
      <div style={{ display: "none" }} ref={sourceEl} dangerouslySetInnerHTML={{ __html: source }} />
      <div ref={outputEl} />
    </>
  );
};

export default TypingPrint;
