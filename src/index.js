/** * * * * * * * * * * * * * * * * * * * * * * **
 *                    _ooOoo_                    *
 *                   o8888888o                   *
 *                   88" . "88                   *
 *                   (| -_- |)                   *
 *                   O\  =  /O                   *
 *                ____/`---'\____                *
 *              .'  \\|     |//  `.              *
 *             /  \\|||  :  |||//  \             *
 *            /  _||||| -:- |||||-  \            *
 *            |   | \\\  -  /// |   |            *
 *            | \_|  ''\---/''  |   |            *
 *            \  .-\__  `-`  ___/-. /            *
 *          ___`. .'  /--.--\  `. . __           *
 *       ."" '<  `.___\_<|>_/___.'  >'"".        *
 *      | | :  `- \`.;`\ _ /`;.`/ - ` : | |      *
 *      \  \ `-.   \_ __\ /__ _/   .-` /  /      *
 * ======`-.____`-.___\_____/___.-`____.-'====== *
 *                    `=---='                    *
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ *
 *             佛祖保佑       永无BUG              *
 *         此代码经过开光处理，不可能存在bug！        *
 * * * * * * * * * * * * * * * * * * * * * * * **/

/**
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * @author Aaron
 * create in 2020-05-11 by Aaron
 * E-mail: chao_code520@163.com
 * GitHub: https://github.com/Aaron52077
 */

import "./polyfills.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const UI_ROOT_ID = "datav-ui-root";
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: import 'mock'
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  require("./__mocks__");
  console.log("current mode is development, mock is enabled");
}

ReactDOM.render(<App />, document.getElementById(UI_ROOT_ID));
