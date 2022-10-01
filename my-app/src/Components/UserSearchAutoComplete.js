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
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RiotApi_1 = require("../store/RiotApi");
const Utils_1 = require("../Utils");
function UserSearchAutoComplete() {
    (0, react_1.useEffect)(() => {
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
        (0, Utils_1.debounce)(() => __awaiter(this, void 0, void 0, function* () {
            if (value.includes("#")) {
                const [label, tagline] = value.split("#");
                const USER_LIST = yield (0, RiotApi_1.getAccountData)(label, tagline, true);
                setUserList([USER_LIST]);
            }
        }), 2000);
    });
    (0, react_1.useEffect)(() => {
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Autocomplete, { disablePortal: true, id: "user-select-autocomplete", options: userList, onInputChange: handleChangeTextField, onChange: handleChangeAutoComplete, sx: { width: 300 }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params, { label: "\uC720\uC800 \uAC80\uC0C9" })) }) }));
}
exports.default = UserSearchAutoComplete;
