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
const redis_client_1 = __importDefault(require("../../../db/redis-client"));
exports.setOxfordWordMeaningsCache = (word, meaings) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `oxford:${word}`;
    yield redis_client_1.default.rpush(key, ...meaings);
});
exports.getOxfordWordMeaningsFromCache = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `oxford:${word}`;
    const meanings = yield redis_client_1.default.lrange(key, 0, -1);
    return meanings;
});
//# sourceMappingURL=redis-dictionary-cache.js.map