import React, { useRef, forwardRef } from "react";
import { useAutoResize } from "~hooks/useAutoResize";
import { uuid } from "~utils";

export default forwardRef(({ children, style, backgroundColor = "transparent" }, ref) => {
  const filterId = useRef(`border-box8-filterId-${uuid()}`).current;

  const { width, height, domRef } = useAutoResize(ref);

  return (
    <div className="gc-containers" style={style} ref={domRef}>
      <svg className="svg-container" width={width} height={height}>
        <defs>
          <filter id={filterId} height="150%" width="150%" x="-25%" y="-25%">
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
            <feFlood floodColor="rgba(124,231,253,0.7)" result="glowColor">
              <animate
                attributeName="flood-color"
                values="'rgba(124,231,253,0.7);''rgba(124,231,253,0.3);''rgba(124,231,253,0.7);'"
                dur="3s"
                begin="0s"
                repeatCount="indefinite"
              />
            </feFlood>
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
            <feMerge>
              <feMergeNode in="softGlowColored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {width && height && (
          <path
            fill={backgroundColor}
            strokeWidth="2"
            stroke="#2e6099"
            d={`
            M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
            L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${width - 15} ${height - 5}
            L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
            Q 5 5 15 5
          `}
          />
        )}

        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke="#7ce7fd"
          d={`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`}
        />
        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke="#7ce7fd"
          d={`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${width - 5} 15 L ${width - 5} 20`}
        />
        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke="#7ce7fd"
          d={`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `}
        />
        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke="#7ce7fd"
          d={`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `}
        />
      </svg>
      <div className="gc-containers">{children}</div>
    </div>
  );
});
