(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main"],{

/***/ 615:
/*!******************************************************************************************************************************!*\
  !*** /Users/zlz/Desktop/gooci/redfish/main.js?{"page":"pages%2Fo2o%2Fpages%2Fgoodsdetails_modules%2Fo2o_goosDetail%2Fmain"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue */ 616));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 616:
/*!*****************************************************************************************************!*\
  !*** /Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.vue?vue&type=template&id=708fe104&scoped=true& */ 617);
/* harmony import */ var _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.vue?vue&type=script&lang=js& */ 619);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.vue?vue&type=style&index=0&id=708fe104&lang=less&scoped=true& */ 621);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "708fe104",
  null,
  false,
  _main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 617:
/*!************************************************************************************************************************************************!*\
  !*** /Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=template&id=708fe104&scoped=true& ***!
  \************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./main.vue?vue&type=template&id=708fe104&scoped=true& */ 618);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_template_id_708fe104_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 618:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=template&id=708fe104&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 619:
/*!******************************************************************************************************************************!*\
  !*** /Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./main.vue?vue&type=script&lang=js& */ 620);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 620:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;























































































































var _http = _interopRequireDefault(__webpack_require__(/*! @/api/http.js */ 50));
var _date = __webpack_require__(/*! @/utils/prototype/date.js */ 8);




var _vue = __webpack_require__(/*! @/utils/prototype/vue.js */ 11);




var _interface = __webpack_require__(/*! @/api/interface.js */ 57);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { base64src } from "@/utils/base64src.js";
var commonHeader = function commonHeader() {__webpack_require__.e(/*! require.ensure | components/communal/commonHeader */ "components/communal/commonHeader").then((function () {return resolve(__webpack_require__(/*! @/components/communal/commonHeader */ 1209));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Banner = function Banner() {__webpack_require__.e(/*! require.ensure | pages/compenent_modules/o2o_banner/index */ "pages/compenent_modules/o2o_banner/index").then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_banner/index */ 1287));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var groupBanner = function groupBanner() {__webpack_require__.e(/*! require.ensure | pages/compenent_modules/group_banner/index */ "pages/compenent_modules/group_banner/index").then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/group_banner/index */ 1294));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var assBanner = function assBanner() {__webpack_require__.e(/*! require.ensure | pages/compenent_modules/assemble_banner/index */ "pages/compenent_modules/assemble_banner/index").then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/assemble_banner/index */ 1301));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var seckillBanner = function seckillBanner() {__webpack_require__.e(/*! require.ensure | pages/compenent_modules/seckill_banner/index */ "pages/compenent_modules/seckill_banner/index").then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/seckill_banner/index */ 1308));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Specs = function Specs() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_specs/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_specs/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_specs/index */ 1315));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Promotions = function Promotions() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_Promotion/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_Promotion/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_Promotion/index */ 1323));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Coupon = function Coupon() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_coupon/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_coupon/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_coupon/index */ 1330));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Delivery = function Delivery() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_delivery/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_delivery/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_delivery/index */ 1337));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Evaluate = function Evaluate() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_evaluate/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_evaluate/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_evaluate/index */ 1344));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var proInfor = function proInfor() {__webpack_require__.e(/*! require.ensure | pages/compenent_modules/o2o_proInfor/index */ "pages/compenent_modules/o2o_proInfor/index").then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_proInfor/index */ 1351));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Footers = function Footers() {Promise.all(/*! require.ensure | pages/compenent_modules/o2o_footer/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/o2o_footer/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/o2o_footer/index */ 1358));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var groupFooters = function groupFooters() {Promise.all(/*! require.ensure | pages/compenent_modules/group_footer/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/group_footer/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/group_footer/index */ 1365));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var assFooters = function assFooters() {Promise.all(/*! require.ensure | pages/compenent_modules/assemble_footer/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/assemble_footer/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/assemble_footer/index */ 1372));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var seckillFooters = function seckillFooters() {Promise.all(/*! require.ensure | pages/compenent_modules/seckill_footer/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/seckill_footer/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/seckill_footer/index */ 1379));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var quickGroup = function quickGroup() {Promise.all(/*! require.ensure | pages/compenent_modules/quick_group/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/compenent_modules/quick_group/index")]).then((function () {return resolve(__webpack_require__(/*! ../../../../compenent_modules/quick_group/index */ 1386));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default = { data: function data() {return { title: "商品详情", leftIcon: false, rightIcon: false, goodsInforbox: "", sonRefresh: false, showhiden: false, //   bot: "0px",
      goodsnum: 1, goodsPrice: "", specsList: [], //处理后的规格
      skuId: "", specList: [], //规格数组
      index1: "", bot: "-450px", specsStr: [], spec: [], specShowed: true, noAddcat: true, baseColor: "", rsSpecValueDomainList: [], //规格数组
      getspecs: "", goodsRemark: "", //产品介绍
      indexs: "1", //收藏 0是收藏，1是未收藏
      collectCode: "", //已经收藏的商品code
      collectUrl: "", //收藏URL
      userImgurl: "", getJson: "", //接受参数
      skuList: {}, couponList: [], //优惠券列表
      noCoupon: "", Promlist: [], //促销列表
      noProm: "", totals: "", evaluateList: [], nullImg: this.$imgDomain + "/paas/shop-master/c-static/images/wxminiImg/no_coupon.png", getUrl: "", goodsCode: "", pntreeCode: "", goodtypes: "", getgoodtypes: "00", listPro: [], quickShow: false, ginfoCode: "", conts: "0", listp: [], couponOnceNumd: "", //已拼人数
      couponOnceNums: "", userInfor: {}, poster: false, shareWrap: false, miniErImg: null, posterImg: null, //合成海报的img
      pp: "" };}, components: { commonHeader: commonHeader, Banner: Banner, groupBanner: groupBanner, assBanner: assBanner, seckillBanner: seckillBanner, Specs: Specs, Promotions: Promotions, Coupon: Coupon, Delivery: Delivery, Evaluate: Evaluate, proInfor: proInfor, Footers: Footers, groupFooters: groupFooters, assFooters: assFooters, seckillFooters: seckillFooters, quickGroup: quickGroup }, onLoad: function onLoad(options) {var _this = this;var that = this;that.userInfor = _vue.$storage.get("loginInfor");Object.assign(that.$data, that.$options.data()); //初始化数据
    var pages = getCurrentPages();var prevpage = pages[0]; // 登陆颜色 商城名字信息
    if (!_vue.$storage.get("baseColor")) {_http.default.get(_interface.getProappinfo).then(function (res) {_vue.$storage.set("proappEnvName", res.proappEnvName);_vue.$storage.set("baseColor", res.proappEnvTheme);_vue.$storage.set("unitPrice", JSON.parse(res.proappEnvOpenconf));wx.setNavigationBarTitle({ title: _vue.$storage.get("proappEnvName") });wx.setNavigationBarColor({ frontColor: "#ffffff", // 必写项
          backgroundColor: "#" + _vue.$storage.get("baseColor") });that.$state.baseColor = _vue.$storage.get("baseColor");that.baseColor = "#" + _this.$state.baseColor;});} else {that.baseColor = "#" + that.$state.baseColor;that.$state.baseColor = _vue.$storage.get("baseColor");wx.setNavigationBarColor({ frontColor: "#ffffff", // 必写项
        backgroundColor: "#" + _vue.$storage.get("baseColor") });}_vue.$storage.set("prevpage", prevpage.route);
    wx.getSetting({
      success: function success(res) {
        if (!res.authSetting["scope.userInfo"]) {
          _vue.$router.push("authorization", {
            redirectUrl: "o2o/pages/goodsdetails_modules/o2o_goosDetail" });

        }
      },
      fail: function fail(res) {
        console.log(res);
      } });

    that.getgoodtypes = "00";

    //调用单独的商品信息
    // if (options && options.json) {
    //   let skuCode = JSON.parse(options.json).skuCode;
    //   this.getJson = skuCode;
    //   this.getUrl = JSON.parse(options.json).path;
    //   this.getSkuInfo(JSON.parse(options.json).skuCode);
    // } else {
    // wx.showToast({
    //   title: JSON.stringify(options),
    //   icon: "success",
    //   duration: 2000
    // });

    // }
    console.log(options, "options");
    if (options && options.scene) {
      //contractTypepro-userId-skuCode
      var scene = decodeURIComponent(options.scene);
      console.log(scene, "scene");
      // wx.showModal({
      //   title: 'scene',
      //   content: scene,
      //   success (res) {
      //   }
      // })
      that.getJson = scene.split("-")[2] || _vue.$storage.get("skuCode");
      that.getUserInfo(scene.split("-")[1]);
      _vue.$storage.set("contractTypepro", scene[0]);
    } else if (options.json) {
      var json = JSON.parse(options.json);
      that.getJson = json.skuCode || _vue.$storage.get("skuCode");

    } else {
      that.getJson = options.skuCode || _vue.$storage.get("skuCode");
      that.getUrl = options.path;
      if (options.groupName) {
        _vue.$storage.set("groupName", options.groupName);
        _vue.$storage.set("groupCode", options.groupCode);
        console.log(options.contractTypepro, "options.contractTypepro");
        _vue.$storage.set("contractTypepro", options.contractTypepro);
        console.log(_vue.$storage.get("contractTypepro"));
      }
    }
    _vue.$storage.set("skuCode", that.getJson);

    that.getSkuInfo(_vue.$storage.get("skuCode"));
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    wx.hideShareMenu();
  },
  computed: {
    unitPrice: function unitPrice() {
      // mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
      return this.$state.unitPrice || _vue.$storage.get("unitPrice");
    } },

  mounted: function mounted() {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var collectUrl = currentPage.route; //当前页面url
    this.collectUrl = collectUrl;
    this.baseColor = "#" + this.$state.baseColor;
  },
  onShareAppMessage: function onShareAppMessage(res) {
    var that = this;
    if (res.from === "button") {
      // 通过按钮触发
      var _path = null;
      if (_vue.$storage.get("loginInfor").userinfoQuality.indexOf("group") >= 0) {
        _path = "/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main?groupCode=".concat(

        _vue.$storage.get("loginInfor").userInfoCode, "&groupName=").concat(
        _vue.$storage.get("loginInfor").merberCompname, "&skuCode=").concat(
        that.getJson, "&contractTypepro=40");

      } else {
        _path = "/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main?skuCode=".concat(
        that.getJson);

      }
      return {
        path: _path,
        title: that.skuList.goodsName,
        imageUrl: that.skuList.rsGoodsFileDomainList[0].goodsFileUrl,
        success: function success(res) {
          // 转发成功
          that.poster = false;
          that.showhiden = false;
          this.shareWrap = false;
        },
        fail: function fail(res) {
          // 转发失败
          console.log("转发失败");
        } };

    }
  },
  methods: {
    share: function share() {
      var that = this;
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            that.showhiden = true;
            that.shareWrap = true;
          } else {
            _vue.$router.push("authorization", {
              redirectUrl: "o2o/pages/goodsdetails_modules/o2o_goosDetail" });

          }
        },
        fail: function fail(res) {
          console.log(res);
        } });

    },
    getUserInfo: function getUserInfo(id) {
      var that = this;
      _http.default.
      get("/web/um/userservice/getUserservice.json", {
        userId: id }).

      then(function (res) {
        _vue.$storage.set("groupName", res.merberCompname);
        _vue.$storage.set("groupCode", res.userInfoCode);
      });
    },
    closeShare: function closeShare() {
      this.showhiden = false;
      this.shareWrap = false;
    },
    showSpec: function showSpec(val) {
      this.goodtypes = val;
      this.showhiden = true;
      this.bot = "0px";
    },
    //返回
    goBack: function goBack() {var _this2 = this;
      var goUrl = _vue.$storage.get("getTopPerMenuList");
      var urlList = [];
      goUrl.map(function (el) {
        if (el.menuCode == "00000042") {
          urlList = el.children;
        }
      });
      if (this.getUrl == "home") {
        this.$router.replace("web", {
          defaultUrl: _vue.$storage.get("pagesUrl") });

      } else if (this.getUrl == "channel") {
        urlList.map(function (el) {
          if (el.proappMenuCode == "mp000014001") {
            _this2.$router.replace("web", {
              defaultUrl: _this2.$businessDomain + "/paas/shop/" + el.menuAction });

          }
        });
      } else if (this.getUrl == "childchannel") {
        urlList.map(function (el) {
          if (el.proappMenuCode == "mp000014002") {
            _this2.$router.replace("web", {
              defaultUrl: _this2.$businessDomain + "/paas/shop/" + el.menuAction });

          }
        });
      } else {
        this.$router.back();
      }
    },
    getSpec: function getSpec(str) {
      this.getspecs = str;
    },
    getSkuInfo: function getSkuInfo(codes) {var _this3 = this;
      _http.default.get(_interface.getResourceGoodsInfoBySkuCode, {
        skuCode: codes }).
      then(function (res) {
        _this3.getgoodtypes = res.goodsType;
        console.log(res.goodsType, "res.goodsType------------");
        _vue.$storage.set("goodsType", res.goodsType);

        _this3.goodsCode = res.goodsCode;
        _this3.ginfoCode = res.ginfoCode && res.ginfoCode;
        //拼团请求快速成团接口
        if (res.goodsType == "25") {
          _vue.$storage.set("contractTypepro", "01");
          _http.default.
          get(_interface.queryPromotionPageAssembleForPc, {
            promotionPcode: res.ginfoCode }).

          then(function (res) {
            if (res.list && res.list.length > 0) {
              _this3.listp = res.list;
              _this3.listp.map(function (el) {
                el.promotionActname = (0, _date.formatPhone)(el.promotionActname);
              });
              _this3.quickShow = true;
            }
          });
        }
        //拼团和团购请求接口（请求已拼人数）
        // if (res.goodsType == "24" || res.goodsType == "25") {
        _http.default.
        get(_interface.getPmPromotionInfo, {
          promotionCode: res.ginfoCode }).

        then(function (res) {
          if (res == null) {} else {
            _this3.couponOnceNumd = res.couponOnceNumd ? res.couponOnceNumd : 0; //已经开团数量
            _this3.couponOnceNums = res.couponOnceNums ? res.couponOnceNums : 0; //基础设置开团次数
            _vue.$storage.set("payTime", res.promotionPaytime);
          }
        });
        // }

        if (res.rsSkuDomainList.length > 0) {
          _this3.skuList = {};
          res.rsSkuDomainList.map(function (el, index) {
            if (el.skuCode == _this3.getJson) {
              _this3.skuList = res.rsSkuDomainList[index];
            }
            if (
            res.goodsType == "24" ||
            res.goodsType == "25" ||
            res.goodsType == "26")
            {
              _vue.$storage.set("goodsPmbillno", res.ginfoCode);
              _vue.$storage.set("goodsPbillno", res.goodsProperty3);
              _this3.skuList.goodsThdate = res.goodsThdate && res.goodsThdate;
              _this3.skuList.goodsOdate = res.goodsOdate && res.goodsOdate;
              _this3.skuList.goodsProperty3 =
              res.goodsProperty3 && res.goodsProperty3;
              _this3.skuList.goodsNum = res.goodsNum && res.goodsNum;
              _this3.skuList.ginfoCode = res.ginfoCode && res.ginfoCode;
              if (el.goodsNum - el.goodsSalesvolume > 0) {
                _this3.skuList.shengyunum = el.goodsNum - el.goodsSalesvolume;
              } else {
                _this3.skuList.shengyunum = "0";
              }
            }
            // console.log(this.skuList,"this.skuList------------------------------")

            if (!RegExp(/http/).test(el.dataPic)) {
              el.dataPic = _this3.$domain + el.dataPic;
            }
            el.rsGoodsFileDomainList.map(function (str) {
              if (!RegExp(/http/).test(str.goodsFileUrl)) {
                str.goodsFileUrl = _this3.$domain + str.goodsFileUrl;
              }
            });
          });
          _this3.getspecs =
          _this3.skuList.skuName &&
          _this3.skuList.skuName.replace(new RegExp("/", "g"), ",");
        }
        if (_this3.skuList.goodsSalesvolume == null) {
          _this3.skuList.goodsSalesvolume = "0";
        }
        _this3.specsList =
        _this3.skuList.skuName && _this3.skuList.skuName.split("/");
        _this3.skuId = _this3.skuList && _this3.skuList.skuId;
        _this3.goodsPrice =
        _this3.skuList.pricesetNprice &&
        (_this3.skuList.pricesetNprice * 1).toFixed(2);
        _this3.goodsInforbox = res;
        _this3.goodsRemark = res.goodsRemark;
        _this3.pntreeCode = res.pntreeCode;
        // 处理规格
        var map = {};
        for (var i = 0; i < res.rsSpecValueDomainList.length; i++) {
          var ai = res.rsSpecValueDomainList[i];
          if (!map[ai.specName]) {
            _this3.specList.push({
              specName: ai.specName,
              specCode: ai.specCode,
              specGroupCode: ai.specGroupCode,
              tenantCode: ai.tenantCode,
              specOptionList: [ai] });

            map[ai.specName] = ai;
          } else {
            for (var j = 0; j < _this3.specList.length; j++) {
              var dj = _this3.specList[j];
              if (dj.specName == ai.specName) {
                dj.specOptionList.push(ai);
                break;
              }
            }
          }
        }
        var arr = _this3.skuList.skuName && _this3.skuList.skuName.split("/");
        _this3.specList.map(function (els) {
          els.specOptionList.map(function (el, index) {
            arr.forEach(function (element) {
              if (element == el.specValueValue) {
                el.nu = index;
              }
            });
          });
        });
        var that = _this3;
        // 校验商品是否收藏
        if (_vue.$storage.get("userInfo") && _vue.$storage.get("loginInfor")) {
          that.addHisty(that.skuList); //添加足迹
        }
        _this3.goodsRemark =
        _this3.goodsRemark &&
        _this3.goodsRemark.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        function (match, capture) {
          return (
            '<img style="width:100%"  src="' + (
            that.$domain + capture) +
            '"/>');

        });

      });
    },
    //添加足迹
    addHisty: function addHisty(res) {
      var _datas = {
        footprintType: "0", //0商品1店铺2其它
        footprintOpcode: res.skuCode,
        footprintOppic: res.dataPic, //浏览图片
        footprintOpcont: res.goodsName, //浏览内容
        footprintOpnum: res.pricesetNprice, //浏览对应的量（商品价格店铺数量）
        footprintOpurl: this.collectUrl // 收藏URL
      };
      _http.default.post(_interface.saveFootprint, _datas).then(function (res) {
        if (res.success) {} else {}
      });
    },
    // 关闭弹窗
    _close: function _close() {
      this.showhiden = false;
      this.bot = "-450px";
    },
    //过滤数组
    filter_array: function filter_array(array) {
      return array.filter(function (item) {return item;});
    },
    //商品数量--
    goodsReduce: function goodsReduce() {
      this.goodsnum--;
      if (this.goodsnum < 1) {
        this.goodsnum = 1;
      }
    },
    //商品数量++
    goodsAdd: function goodsAdd() {
      this.goodsnum++;
    },
    //选择规格(n:第一层，index：第二层)
    changespecList: function changespecList(n, inde, names) {var _this4 = this;
      this.specsList = [];
      var that = this;
      that.specList[inde].specOptionList.map(function (el, index) {
        if (index == n) {
          _this4.specList[inde].specOptionList[n].nu = n;
        } else {
          el.nu = null;
        }
      });
      this.filter_array(that.specList).map(function (ele) {
        ele.specOptionList.map(function (els) {
          if (els.nu != null) {
            _this4.specsList.push(els.specValueValue);
          }
        });
      });
    },
    // 校验规格商品是否存在
    checkGoodsBySpec: function checkGoodsBySpec(str) {var _this5 = this;
      var _data = {
        specStr: JSON.stringify(str),
        goodsCode: this.skuList.goodsCode };

      _http.default.post(_interface.addShoppingGoodsBySpec, _data).then(function (res) {
        if (res.success) {
          _this5.noAddcat = true;
          if (res.dataObj != null) {
            _this5.skuId = res.dataObj.skuId;
            _this5.goodsPrice = res.pricesetNprice;
            _this5.userImgurl = _this5.$domain + res.dataObj.dataPic;
            if (
            _this5.getgoodtypes == 24 ||
            _this5.getgoodtypes == 25 ||
            _this5.getgoodtypes == 26)
            {
              _this5.goBuy();
            } else {
              _this5.addCart();
            }
          }
        } else {
          _vue.$message.alert(res.msg);
          _this5.noAddcat = false;
        }
      });
    },
    //请求接口加入购物车
    addCart: function addCart() {var _this6 = this;
      var addstr = {
        skuId: this.skuId,
        goodsNum: this.goodsnum };

      _http.default.post(_interface.addShoppingGoods, addstr).then(function (st) {
        if (st.success) {
          _vue.$message.alert("加入购物车成功");
          _this6._close();
        } else {
          _vue.$message.alert(st.msg);
        }
      });
    },
    //立即购买
    goBuy: function goBuy() {
      var atr = {
        skuId: this.skuId,
        goodsNum: this.goodsnum };

      this.$router.replace("order/accounts", {
        json: JSON.stringify(atr) });

    },

    //确认加入购物车
    confirmBtn: function confirmBtn(i) {
      var that = this;
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            if (that.specsList.length == that.specList.length) {
              that.checkGoodsBySpec(that.specsList);
            } else {
              _vue.$message.alert("请选择商品规格！");
            }
          } else {
            _vue.$router.push("authorization", {
              redirectUrl: "o2o/pages/goodsdetails_modules/o2o_goosDetail?skuCode=" +
              that.getJson });

          }
        },
        fail: function fail(res) {
          console.log(res);
        } });

    },
    cengHandler: function cengHandler() {
      this.shareWrap = false;
      this.poster = false;
      this.showhiden = false;
      this.bot = "-450px";
    },
    canvasHander: function canvasHander() {
      var that = this;
      that.closeShare();
      wx.showLoading({
        title: "海报生成中..." });

      var goodsObj = {
        src: that.skuList.rsGoodsFileDomainList[0].goodsFileUrl,
        title: that.skuList.goodsName,
        price: "\uFFE5".concat((that.skuList.pricesetNprice * 1).toFixed(2)),
        width: 220, //图片的默认宽度是220px
        wxPrompt: "长按图片识别小程序",
        wxPrompt2: "品质好货 优惠购买" };

      if (that.posterImg) {
        that.showhiden = true;
        that.poster = true;
        wx.hideLoading();
        return;
      }
      wx.downloadFile({
        url: that.$domain + "/paas/shop-master/c-static/images/mini-bg.png",
        success: function success(bg) {
          console.log(bg);
          wx.downloadFile({
            url: goodsObj.src,
            success: function success(res) {
              _http.default.
              post("/web/ml/mlogin/loginMiniCode.json", {
                // scene: `groupCode=${
                //   $storage.get("loginInfor").userInfoCode
                // }&groupNmae="${
                //   $storage.get("loginInfor").merberCompname
                // }&skuCode=${that.getJson}&contractTypepro=40"`,
                scene: "40-".concat(_vue.$storage.get("loginInfor").userId, "-").concat(
                that.getJson),
                //contractTypepro-userId-skuCode
                page: "pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main",
                width: 280,
                auto_color: true }).

              then(function (el) {
                var captchaImage =
                "data:image/png;base64," +
                el.dataObj.dataObj.replace(/[\r\n]/g, "");
                // base64src(captchaImage, wxer => {
                //   let dx = (280 - goodsObj.width) / 2;
                //   if (res.statusCode === 200) {
                //     var ctx = wx.createCanvasContext("poster");
                //     ctx.drawImage(bg.tempFilePath, 0, 0, 280, 440);
                //     ctx.drawImage(
                //       res.tempFilePath,
                //       dx,
                //       30,
                //       goodsObj.width,
                //       goodsObj.width
                //     );
                //     ctx.setFontSize(12);
                //     ctx.setFillStyle("#444");
                //     let lineWidth = 0,
                //       canvasWidth = 200, //计算canvas的宽度
                //       initHeight = goodsObj.width + 55, //绘制字体距离canvas顶部初始的高度
                //       lastSubStrIndex = 0, // 每次开始截取的字符串的索引
                //       index = 1; //表示行数
                //     for (let i = 0; i < goodsObj.title.length; i++) {
                //       lineWidth += ctx.measureText(goodsObj.title[i]).width;
                //       if (index < 3) {
                //         // 最多2行
                //         if (lineWidth > canvasWidth) {
                //           ctx.fillText(
                //             goodsObj.title.substring(lastSubStrIndex, i),
                //             30,
                //             initHeight
                //           ); //绘制截取部分
                //           initHeight += 20; //20为字体的高度
                //           lineWidth = 0;
                //           lastSubStrIndex = i;
                //           index++;
                //         }
                //         if (i == goodsObj.title.length - 1) {
                //           //绘制剩余部分
                //           ctx.fillText(
                //             goodsObj.title.substring(lastSubStrIndex, i + 1),
                //             30,
                //             initHeight
                //           );
                //         }
                //       }
                //     }
                //     ctx.setFontSize(13);
                //     ctx.setFillStyle("#f22929");
                //     ctx.fillText(goodsObj.price, 30, initHeight + 22, 200);
                //     ctx.drawImage(wxer, 30, goodsObj.width + 120, 70, 70);
                //     ctx.setFontSize(14);
                //     ctx.setFillStyle("#000");
                //     ctx.fillText(
                //       goodsObj.wxPrompt,
                //       130,
                //       initHeight + 75,
                //       200
                //     );
                //     ctx.setFontSize(12);
                //     ctx.setFillStyle("#333");
                //     ctx.fillText(
                //       goodsObj.wxPrompt2,
                //       143,
                //       initHeight + 92,
                //       200
                //     );
                //     ctx.draw(true, function() {
                //       wx.canvasToTempFilePath({
                //         canvasId: "poster",
                //         success: function(res) {
                //           console.log(res, "合成成功");
                //           that.posterImg = res.tempFilePath;
                //           that.showhiden = true;
                //           that.poster = true;
                //         },
                //         fail: function(err) {
                //           console.log(err, "合成失败");
                //         }
                //       });
                //     });
                //     setTimeout(() => {
                //       wx.hideLoading();
                //     }, 200);
                //   }
                // });
              });
            },
            error: function error(res) {
              setTimeout(function () {
                wx.hideLoading();
                wx.showToast({
                  title: "生成失败",
                  icon: "none",
                  duration: 2000 });

              }, 200);
            } });

        } });

    },
    downloadFileImg: function downloadFileImg() {
      var posterImg = this.posterImg,
      that = this;
      // if(that.posterImg){

      // }
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: function success(el) {
                console.log(el, posterImg, "elelel");
                wx.saveImageToPhotosAlbum({
                  filePath: posterImg,
                  success: function success(res) {
                    wx.showToast({
                      title: "保存成功",
                      icon: "none",
                      duration: 2000 });

                  },
                  fail: function fail(error) {
                    console.log(error);
                    wx.showToast({
                      title: "保存失败",
                      icon: "none",
                      duration: 2000 });

                  },
                  complete: function complete() {
                    that.poster = false;
                    that.showhiden = false;
                  } });

              } });

          } else {
            console.log(posterImg, "elelel");
            wx.saveImageToPhotosAlbum({
              filePath: posterImg,
              success: function success(res) {
                wx.showToast({
                  title: "保存成功",
                  icon: "none",
                  duration: 2000 });

              },
              fail: function fail(error) {
                console.log(error);
                wx.showToast({
                  title: "保存失败",
                  icon: "none",
                  duration: 2000 });

              },
              complete: function complete() {
                that.poster = false;
                that.showhiden = false;
              } });

          }
        } });

      //
    } } };exports.default = _default;

/***/ }),

/***/ 621:
/*!***************************************************************************************************************************************************************!*\
  !*** /Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=style&index=0&id=708fe104&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./main.vue?vue&type=style&index=0&id=708fe104&lang=less&scoped=true& */ 622);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_main_vue_vue_type_style_index_0_id_708fe104_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 622:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/zlz/Desktop/gooci/redfish/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.vue?vue&type=style&index=0&id=708fe104&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[615,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages/o2o/pages/goodsdetails_modules/o2o_goosDetail/main.js.map