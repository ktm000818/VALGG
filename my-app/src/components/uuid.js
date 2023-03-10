"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUUID = void 0;
const makeUUID = () => {
    return window.self.crypto.randomUUID();
};
exports.makeUUID = makeUUID;
