/**
 * 动态表单form组件
 */
import checkbox from './form/checkbox';
import checkboxes from './form/checkbox/group';
import color from './form/color';
import date from './form/date';
import dateRange from './form/date/range';
import input from './form/input';
import size from './form/input/size';
import map from './form/map';
import multipleSelect from './form/select/multiple';
import number from './form/number';
import radio from './form/radio';
import select from './form/select';
import slider from './form/slider';
import switch1 from './form/switch';
import textarea from './form/textarea';
import html from './form/html';
import upload from './form/upload';
import uploadCrop from './form/upload/crop';
import uploadExcel from './form/upload/excel';
import collapse from './form/collapse';

/**
 * 自定义表单组件
 */
import dynamicData from './dynamic-data';
import dependenceSelect from './dependence';
import background from './background';

/**
 * 设计器内部（展示区域）物料组件
 */
import { GraphEffect, Pie } from './vcharts';
import { Decoration1, Decoration2, Decoration3, Decoration4 } from './decoration';
import ScrollPanel from './scroll-panel';
import ScrollRankPanel from './rank-panel';
import DigitalFlop from './digital-flop';
import Countdown from './countdown';
import Indicator from './indicator';
import Viframe from './iframe';
import {
  BorderBox1,
  BorderBox2,
  BorderBox3,
  BorderBox4,
  BorderBox5,
  BorderBox6,
  BorderBox7,
  BorderBox8,
  BorderBox9
} from './border';
import FormContainer from './form/container';

const widgets = {
  checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input,
  size,
  map,
  multipleSelect, // 下拉多选
  number,
  radio,
  select,
  slider, // 带滚条的number
  switch: switch1,
  textarea,
  collapse,
  html,
  upload,
  uploadCrop,
  uploadExcel,
  dynamicData,
  dependenceSelect,
  background
};

/**
 * 物料元件市场
 */
const materials = {
  bar: GraphEffect,
  'bar-crosswise': GraphEffect,
  'bar-series': GraphEffect,
  'bar-heap': GraphEffect,
  'bar-contrast': GraphEffect,
  'bar-bothway': GraphEffect,
  'bar-alien': GraphEffect,
  line: GraphEffect,
  'step-line': GraphEffect,
  'line-middle': GraphEffect,
  'line-bar': GraphEffect,
  pie: Pie,
  'pie-nested': Pie,
  'pie-rose': Pie,
  'pie-double': Pie,
  'pie-play': Pie,
  'china-map': GraphEffect,
  'map-city': GraphEffect,
  decoration1: Decoration1,
  decoration2: Decoration2,
  decoration3: Decoration3,
  decoration4: Decoration4,
  'scroll-panel': ScrollPanel,
  'rank-panel': ScrollRankPanel,
  'digital-flop': DigitalFlop,
  countdown: Countdown,
  indicators: Indicator,
  border1: BorderBox1,
  border2: BorderBox2,
  border3: BorderBox3,
  border4: BorderBox4,
  border5: BorderBox5,
  border6: BorderBox6,
  border7: BorderBox7,
  border8: BorderBox8,
  border9: BorderBox9,
  iframe: Viframe,
  container: FormContainer
};

// 组件映射关系
const mapping = {
  default: 'input',
  string: 'input',
  boolean: 'switch',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  size: 'size',
  select: 'select',
  'date:dateTime': 'date',
  'string:upload': 'upload',
  'string:crop': 'uploadCrop',
  'string:date': 'date',
  'string:dateTime': 'date',
  'string:time': 'date',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'input',
  'string:email': 'input',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  'array?enum': 'checkboxes'
};

/**
 * 区分表单组件和常规组件
 * @param {*} type 类型
 * @param {*} mode field/常用 form/表单
 */
export function getField(type, mode = 'field') {
  let fieldCanRedefine = false;
  let Field = mode === 'form' ? widgets[type] : materials[type];

  if (Field) {
    fieldCanRedefine = !!Field;
  }

  return {
    fieldCanRedefine,
    Field: Field || null
  };
}

export { widgets, materials, mapping };
