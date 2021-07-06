// eslint-disable-next-line
import { uuid } from "~utils";

const targetId = uuid();

class WaterMark {
  constructor(opts = {}) {
    this.drawCanvas = this.drawCanvas.bind(this);
    this.parentObserver = this.parentObserver.bind(this);
    this.repaint = this.repaint.bind(this);
    this.remove = this.remove.bind(this);
    this.isObserved = false;

    if (opts.clear) {
      this.remove();
    } else if (opts.repaint) {
      this.repaint();
    } else {
      this.init(opts);
      this.drawCanvas();
      // this.parentObserver();
    }
  }

  init(opts) {
    this.option = {};
    this.option.text = opts.text || "datav pro商用通用水印";
    this.option.font = opts.font || "15px Vedana";
    this.option.canvasWidth = opts.canvasWidth || 300;
    this.option.canvasHeight = opts.canvasHeight || 240;
    this.option.textAlign = opts.textAlign || "left";
    this.option.textStyle = opts.textStyle || "rgba(100, 100, 100, 0.85)";
    this.option.textBaseline = opts.textBaseline || "middle";
    this.option.degree = opts.degree || -20;
  }

  drawCanvas() {
    this.isObserved = true;
    let container = document.createElement("div");
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    container.id = targetId;

    canvas.width = this.option.canvasWidth;
    canvas.height = this.option.canvasHeight;
    context.font = this.option.font;
    context.textAlign = this.option.textAlign;
    context.fillStyle = this.option.textStyle;
    context.textBaseline = this.option.textBaseline;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((this.option.degree * Math.PI) / 180);
    context.fillText(this.option.text, 0, 0);

    let backgroundUrl = canvas.toDataURL("image/png");
    this.styles = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:9999;
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${backgroundUrl}')`;
    container.setAttribute("style", this.styles);
    document.body.appendChild(container);
    this.observer(container);
    this.isObserved = false;
  }

  observer(container) {
    // childList —— node 的直接子节点的更改，
    // attributes —— node 的特性（attribute），
    // characterData —— 是否观察 node.data（文本内容）
    let wmConf = { attributes: true, childList: true, characterData: true };
    let observer = new MutationObserver((mo) => {
      if (!this.isObserved) {
        let _obj = mo[0].target;
        _obj.setAttribute("style", this.styles);
        _obj.setAttribute("id", targetId);
        observer.takeRecords();
      }
    });
    observer.observe(container, wmConf);
  }

  parentObserver() {
    let bodyObserver = new MutationObserver(() => {
      if (!this.isObserved) {
        let _dom = document.querySelector(`#${targetId}`);
        if (_dom && _dom.parentNode) {
          if (_dom.getAttribute("style") !== this.styles) {
            _dom.setAttribute("style", this.styles);
          }
        }
      }
    });
    bodyObserver.observe(document.querySelector(`#${targetId}`).parentNode, { childList: true });
  }

  repaint(opts = {}) {
    this.remove();
    this.init(opts);
    this.drawCanvas();
  }

  remove() {
    this.isObserved = true;
    let _vm = document.querySelector(`#${targetId}`);
    _vm && _vm.parentNode.removeChild(_vm);
  }
}

/**
 * 参数 {Object} opt
 * @param {String} text    水印文本，默认'通用水印'
 * @param {String} font    水印字体，默认'30px 黑体'
 * @param {Int} canvasWidth    单个水印容器宽度，默认500
 * @param {Int} canvasHeight    单个水印容器高度，默认200
 * @param {String} textAlign    水印文本对齐方式，默认'center'
 * @param {String} textStyle    水印文本样式，默认'rgba(100,100,100,0.15)'
 * @param {Int} degree    水印文本旋转角度，默认 -20
 * @param return
 **/
const watermark = (opt = {}) => {
  return new WaterMark(opt);
};

export default watermark;
