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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const lodash_1 = require("lodash");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const CustomAutoComplete_1 = __importDefault(require("../components/CustomAutoComplete"));
const RiotApi_1 = require("../store/RiotApi");
const Utils_1 = require("../Utils");
function MainPage() {
    var _a;
    const LS_SEARCH_HISTORY = JSON.parse((_a = localStorage.getItem("searchHistory")) !== null && _a !== void 0 ? _a : "[]");
    const [userList, setUserList] = (0, react_1.useState)([{ name: "" }]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChangeAutoComplete = (0, react_1.useCallback)((value) => {
        var _a;
        if (value) {
            const [name, tag] = value.split("#");
            let searchHistory = JSON.parse((_a = localStorage.getItem("searchHistory")) !== null && _a !== void 0 ? _a : "[]");
            searchHistory.push({ name: value });
            localStorage.setItem("searchHistory", JSON.stringify(Array.from((0, lodash_1.uniqBy)(searchHistory, "name"))));
            navigate(`/profile?name=${name}&tag=${tag}`, {
                state: {
                    name,
                    tag
                }
            });
        }
    }, [navigate]);
    const handleChangeTextField = (0, react_1.useCallback)((value) => __awaiter(this, void 0, void 0, function* () {
        if (value.includes("#")) {
            (0, Utils_1.debounce)(() => __awaiter(this, void 0, void 0, function* () {
                const [name, tag] = value.split("#");
                const USER_LIST = yield (0, RiotApi_1.getAccountData)(name, tag, true);
                setUserList([USER_LIST]);
            }), 500);
        }
        else {
            setUserList([{ name: '' }]);
        }
    }), [userList]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MainWrapper, { children: (0, jsx_runtime_1.jsxs)(MainContentWrapper, { children: [(0, jsx_runtime_1.jsx)(MainContentLogoImageWrapper, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://valorant.op.gg/images/valorant.png", width: "240px" }) }), (0, jsx_runtime_1.jsx)(AutoCompleteWrapper, { children: (0, jsx_runtime_1.jsx)(CustomAutoComplete_1.default, { id: "main_auto_complete", searchHistory: LS_SEARCH_HISTORY, options: userList, onInputChange: handleChangeTextField, onChange: handleChangeAutoComplete, style: { width: "500px" } }) })] }) }) }));
}
exports.default = MainPage;
const MainWrapper = styled_1.default.div `
    background: url(https://valorant.op.gg/images/main_bg_desktop.jpeg) no-repeat center top;
    position: relative;
    min-height: 1080px;
    background-size: cover;
`;
const MainContentWrapper = styled_1.default.div `
    position: relative;
    width: 50%;
    height: 900px;
    margin: auto;
    padding-top: 50px;
`;
const MainContentLogoImageWrapper = styled_1.default.div `
    width: 100%;
    position: absolute;
    left: 0;
`;
const AutoCompleteWrapper = styled_1.default.div `
    position: absolute;
    margin: auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
