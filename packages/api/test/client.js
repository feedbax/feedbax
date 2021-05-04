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
exports.client = void 0;
const socket_1 = require("../client/socket");
const logger_1 = require("../base/logger");
const api_1 = __importDefault(require("../client/api"));
const client = () => __awaiter(void 0, void 0, void 0, function* () {
    const socket = socket_1.io("ws://localhost:3000", {});
    const api = api_1.default.from({ socket, logLevel: logger_1.LogLevel.Trace });
    api.send({
        id: 'login',
        data: {
            uuid: 'uuid',
            eventSlug: 'slug',
        },
        cb: (data) => {
            if (data.err) {
                api.console.error('api.send', 'login', 'callback', data.err);
                return;
            }
            api.console.debug('api.send', 'login', 'callback', data.event);
        }
    });
});
exports.client = client;
