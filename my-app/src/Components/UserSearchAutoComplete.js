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
const core_1 = require("@material-ui/core");
const Autocomplete_1 = __importDefault(require("@mui/material/Autocomplete"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RiotApi_1 = require("../store/RiotApi");
let timer;
function UserSearchAutoComplete() {
    (0, react_1.useEffect)(() => {
        // console.log(autoComplete)
    }, []);
    const [userList, setUserList] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChangeAutoComplete = (e, value) => {
        if (value === null || value === void 0 ? void 0 : value.label) {
            const [username, tagline] = value.label.split("#");
            navigate(`/profile?username=${username}&tagline=${tagline}`, {
                state: {
                    username,
                    tagline
                }
            });
        }
    };
    const handleChangeTextField = (e, value, reason) => __awaiter(this, void 0, void 0, function* () {
        clearTimeout(timer);
        timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (value.includes("#")) {
                console.log(value);
                const [label, tagline] = value.split("#");
                const USER_LIST = yield (0, RiotApi_1.getAccountData)(label, tagline, true);
                setUserList([USER_LIST]);
            }
        }), 1000);
    });
    (0, react_1.useEffect)(() => {
        console.log("렌더링");
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Autocomplete_1.default, { disablePortal: true, id: "user-select-autocomplete", options: userList, onInputChange: handleChangeTextField, onChange: handleChangeAutoComplete, sx: { width: 300 }, renderInput: (params) => (0, jsx_runtime_1.jsx)(core_1.TextField, Object.assign({}, params, { label: "\uC720\uC800 \uAC80\uC0C9" })) }) }));
}
exports.default = UserSearchAutoComplete;
