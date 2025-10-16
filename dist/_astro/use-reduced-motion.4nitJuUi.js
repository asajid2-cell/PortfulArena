import{a as v,r as w}from"./index.DK-fsZOb.js";var c={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m;function M(){if(m)return n;m=1;var t=v(),o=Symbol.for("react.element"),l=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,y=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function d(u,e,f){var r,i={},s=null,p=null;f!==void 0&&(s=""+f),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(p=e.ref);for(r in e)x.call(e,r)&&!h.hasOwnProperty(r)&&(i[r]=e[r]);if(u&&u.defaultProps)for(r in e=u.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:o,type:u,key:s,ref:p,props:i,_owner:y.current}}return n.Fragment=l,n.jsx=d,n.jsxs=d,n}var R;function E(){return R||(R=1,c.exports=M()),c.exports}var P=E();const O=typeof window<"u",a={current:null},_={current:!1};function j(){if(_.current=!0,!!O)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),o=()=>a.current=t.matches;t.addListener(o),o()}else a.current=!1}function S(){!_.current&&j();const[t]=w.useState(a.current);return t}export{j as a,_ as h,O as i,P as j,a as p,S as u};
