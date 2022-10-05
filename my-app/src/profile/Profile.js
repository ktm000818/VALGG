"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RiotApi_1 = require("../store/RiotApi");
require("./profile.css");
function Profile() {
    const [userData, setUserData] = (0, react_1.useState)({});
    const location = (0, react_router_dom_1.useLocation)();
    function fetchUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const USER_DATA = yield (0, RiotApi_1.getAccountData)(location.state.username, location.state.tagline);
                setUserData(USER_DATA);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchUserData();
    }, [location.state.username]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "profile_container" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "1300px", padding: "0 110px", margin: "0 auto", boxSizing: "border-box" } }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { height: "200px", display: "flex", padding: "46px 0 24px", boxSizing: "border-box" } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", borderRadius: "10px", overflow: "hidden" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://valorant.op.gg/images/profile.png", width: "100px", height: "100px" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { padding: "0 24px" } }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", Object.assign({ style: { fontSize: "24px" } }, { children: "\uAE40\uB41C\uBAA8" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: "lightgray" } }, { children: "#ZERG" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: "lightgray", fontSize: "11px" } }, { children: "\uB798\uB354 \uB7AD\uD0B9" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: "lightblue", fontSize: "11px", marginLeft: "4px" } }, { children: "1231th" }))] }), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "16px" } }, { children: (0, jsx_runtime_1.jsx)("button", { children: "\uC804\uC801 \uAC31\uC2E0" }) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: "lightgray", fontSize: "11px" } }, { children: "\uCD5C\uADFC \uC5C5\uB370\uC774\uD2B8: 2\uC77C \uC804" })) })] }))] })) })) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", height: "100vh", margin: "1rem", padding: "1rem", border: "1px solid black" } }, { children: [(0, jsx_runtime_1.jsx)("div", { style: { flexGrow: "1", border: "1px solid black", marginRight: "1rem" } }), (0, jsx_runtime_1.jsx)("div", { style: { flexGrow: "2", border: "1px solid black", marginLeft: "1rem" } })] })), "name: ", userData.name, (0, jsx_runtime_1.jsx)("br", {}), "tag: ", userData.tag, (0, jsx_runtime_1.jsx)("br", {}), "level: ", userData.account_level, (0, jsx_runtime_1.jsx)("br", {}), "puuid: ", userData.puuid] }));
}
exports.default = Profile;
