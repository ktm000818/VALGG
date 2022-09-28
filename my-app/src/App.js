"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const UserSearchAutoComplete_1 = __importDefault(require("./Components/UserSearchAutoComplete"));
const MainPage_1 = __importDefault(require("./mainPage/MainPage"));
require("./App.css");
const Profile_1 = __importDefault(require("./profile/Profile"));
function App() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "header" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ fill: "#000000", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 50 50", width: "50px", height: "50px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M4.781 6.375C4.515 6.044 4.067 5.916 3.669 6.057 3.268 6.197 3 6.575 3 7v18c0 \n                  .232.081.457.228.636l14 17C17.418 42.866 17.701 43 18 43h14c.384 0 \n                  .735-.221.901-.566.167-.347.12-.758-.121-1.059L4.781 6.375zM46.336 \n                  7.059c-.396-.146-.842-.02-1.11.309l-18 22c-.245.299-.295.712-.13 \n                  1.062C27.262 30.777 27.614 31 28 31h14c.304 0 .591-.138.781-.375l4-5C46.923 \n                  25.447 47 25.228 47 25V8C47 7.577 46.734 7.2 46.336 7.059z" }) })), "VALORANT"] }), (0, jsx_runtime_1.jsx)(UserSearchAutoComplete_1.default, {})] })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(MainPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/profile", element: (0, jsx_runtime_1.jsx)(Profile_1.default, {}) })] })] }) }));
}
exports.default = App;
