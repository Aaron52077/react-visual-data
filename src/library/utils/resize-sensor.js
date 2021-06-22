/**
 * fork amis https://github.com/baidu/amis/blob/master/src/utils/resize-sensor.ts
 */
class EventQueue {
  q = [];

  add(cb) {
    this.q.push(cb);
  }

  call(...args) {
    this.q.forEach((fn) => {
      fn(...args);
    });
  }
}

export function getComputedStyle(element, prop) {
  if (element.currentStyle) {
    return element.currentStyle[prop];
  } else if (window.getComputedStyle) {
    const style = window.getComputedStyle(element, undefined);
    return style ? style.getPropertyValue(prop) : undefined;
  } else {
    return element.style[prop];
  }
}

function attachResizeEvent(element, resized) {
  if (!element.resizedAttached) {
    element.resizedAttached = new EventQueue();
    element.resizedAttached.add(resized);
  } else if (element.resizedAttached) {
    element.resizedAttached.add(resized);
    return;
  }

  const resizeSensor = (element.resizeSensor = document.createElement("div"));
  resizeSensor.className = "resize-sensor";
  let style =
    "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;";
  let styleChild = "position: absolute; left: 0; top: 0;";

  resizeSensor.style.cssText = style;
  resizeSensor.innerHTML = `
    <div class="resize-sensor-expand" style="${style}">
      <div style="${styleChild}"></div>
    </div>
    <div class="resize-sensor-shrink" style="${style}">
      <div style="${styleChild} width: 200%; height: 200%"></div>
    </div>
    <div class="resize-sensor-appear" style="${style}animation-name: apearSensor; animation-duration: 0.2s;"></div>`;
  // 要定义 resizeSensor 这个动画，靠这个监听出现。
  element.appendChild(resizeSensor);
  element.hasInlineStyle = element.hasAttribute("style");
  const position = (element.originPosition = getComputedStyle(element, "position"));
  if (!~["fixed", "absolute"].indexOf(position)) {
    element.style.position = "relative";
  }

  const expand = resizeSensor.children[0];
  const expandChild = expand.children[0];
  const shrink = resizeSensor.children[1];
  const appear = resizeSensor.children[2];

  let lastWidth, lastHeight;

  const reset = function () {
    expandChild.style.width = expand.offsetWidth + 10 + "px";
    expandChild.style.height = expand.offsetHeight + 10 + "px";
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
    shrink.scrollLeft = shrink.scrollWidth;
    shrink.scrollTop = shrink.scrollHeight;
    lastWidth = element.offsetWidth;
    lastHeight = element.offsetHeight;
  };

  reset();

  let changed = function () {
    if (element.resizedAttached) {
      element.resizedAttached.call();
    }
  };

  let addEvent = function (el, name, cb) {
    if (el.attachEvent) {
      el.attachEvent("on" + name, cb);
    } else {
      el.addEventListener(name, cb);
    }
  };

  let onScroll = function (e) {
    if (element.offsetWidth != lastWidth || element.offsetHeight != lastHeight) {
      changed();
    }
    reset();
  };

  addEvent(expand, "scroll", onScroll);
  addEvent(shrink, "scroll", onScroll);
  addEvent(appear, "animationstart", reset);
}

function detach(element) {
  if (element.resizeSensor) {
    if (element.hasInlineStyle) {
      element.style.position = element.originPosition;
    } else {
      element.removeAttribute("style");
    }
    try {
      element.removeChild(element.resizeSensor);
    } catch (e) {}
    delete element.resizeSensor;
    delete element.resizedAttached;
    delete element.hasInlineStyle;
    delete element.originPosition;
  }
}

export function resizeSensor(element, callback, once = false) {
  if (once) {
    let _this = this;
    attachResizeEvent(element, function () {
      callback.apply(_this, arguments);
      detach(element);
    });
    return;
  }

  attachResizeEvent(element, callback);
  let detached = false;

  return function () {
    if (detached) return;
    detached = true;
    detach(element);
  };
}
