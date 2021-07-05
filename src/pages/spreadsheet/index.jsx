import React, { useRef, useEffect } from "react";
import { useDocumentTitle } from "~hooks/useDocumentTitle";
import { loadScript } from "~utils";

const rows = {
  len: 80,
  1: {
    cells: {
      0: { text: "testingtesttestetst" },
      2: { text: "testing" }
    }
  },
  2: {
    cells: {
      0: { text: "render", style: 0 },
      1: { text: "Hello" },
      2: { text: "haha", merge: [1, 1] }
    }
  },
  8: {
    cells: {
      8: { text: "border test", style: 0 }
    }
  }
};

const spreadsheetOpts = {
  viewLocalImage: "/report/img", //预览本地图片方法
  uploadUrl: "/report/upload", //统一上传地址
  uploadExcelUrl: "/report/importExcel?token=fdfd", //上传excel方法
  pageSize: [10, 20, 30], //分页条数
  printPaper: [],
  domain: window.location.origin + "/spreadsheet",
  showToolbar: true, //头部操作按钮
  showGrid: true, //excel表格
  showContextmenu: true, //右键操作按钮
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth
  },
  row: {
    len: 100,
    height: 25,
    minRowResizerHeight: 1 //拖拽行最小高度
  },
  col: {
    len: 50,
    width: 100,
    minWidth: 60,
    height: 0,
    minColResizerHeight: 1 //拖拽列最小高度
  },
  style: {
    bgcolor: "#ffffff",
    align: "left",
    valign: "middle",
    textwrap: false,
    strike: false,
    underline: false,
    color: "#0a0a0a",
    font: {
      name: "Microsoft YaHei",
      size: 10,
      bold: false,
      italic: false
    }
  }
};

function SpreadsheetSchema() {
  const spreadsheetRef = useRef();
  useDocumentTitle("轻量级Excel报表");

  useEffect(() => {
    loadScript("./static/spreadsheet/htmlSpreadsheet.css", "css");

    loadScript("./static/spreadsheet/htmlSpreadsheet.js").then(() => {
      loadScript("./static/spreadsheet/zh-CN.js").then(() => {
        htmlSpreadsheet.locale("zh-cn");
        const rows10 = { len: 100 };
        for (let i = 0; i < 100; i += 1) {
          rows10[i] = {
            cells: {
              0: { text: "A-" + i },
              1: { text: "B-" + i },
              2: { text: "C-" + i },
              3: { text: "D-" + i },
              4: { text: "E-" + i },
              5: { text: "F-" + i }
            }
          };
        }
        let htmlSheet = new htmlSpreadsheet(spreadsheetRef.current, spreadsheetOpts)
          .loadData([{ name: "sheet-test", rows: rows10 }])
          .change((data) => {
            // tips: data等价于htmlSheet.getData()
            console.log("change data:", data);
          });

        htmlSheet.cellText(14, 3, "cell-text").reRender();
      });
    });
  }, []);

  return (
    <div
      ref={(el) => {
        spreadsheetRef.current = el;
      }}
    ></div>
  );
}

export default SpreadsheetSchema;
