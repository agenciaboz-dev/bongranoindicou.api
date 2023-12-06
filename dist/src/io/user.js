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
const databaseHandler_1 = __importDefault(require("../databaseHandler"));
const hashids_1 = __importDefault(require("hashids"));
const hashid = new hashids_1.default("bunda", 5);
const list = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield databaseHandler_1.default.user.list();
        socket.emit("customer:list", customer);
    }
    catch (error) {
        console.error(`Error fetching customer list`);
        socket.emit("customer:list:error", { error });
    }
});
const create = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield databaseHandler_1.default.user.create(data);
        // Encode the user's ID
        const encodedId = hashid.encode(user.id);
        // Create the URL for the user's verification page
        const url = `https://example.com/user/${encodedId}`;
        // Emit success event with the url and encodedId
        socket.emit("user:registration:success", { user, url, encodedId });
    }
    catch (error) {
        console.log(error);
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap = {
                email: "Email already exists.",
            };
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:registration:failed", {
                        error: fieldErrorMap[field],
                    });
                    break;
                }
            }
        }
    }
});
const verify = (socket, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user exists
        const user = yield databaseHandler_1.default.user.exists(id);
        if (!user) {
            // If the user doesn't exist, emit an error event
            socket.emit("application:aproval:error", {
                error: "User not found",
            });
            return;
        }
        // Check if the user is already verified
        if (user.verified) {
            // If the user is already verified, emit an error event
            socket.emit("application:aproval:error", {
                error: "User is already verified",
            });
            return;
        }
        // FALTANDO LÓGICA DE VERIFICAÇÃO DO CODIGO DE VERIFICAÇÃO ENVIADO NO EMAIL
        // Update the user's verification status to true
        yield databaseHandler_1.default.user.verify(id);
        // Emit a successful verification event
        socket.emit("application:status:approved", {
            message: "Your account has been verified.",
        });
    }
    catch (error) {
        console.log(error);
        // Emit a generic error event if there's an issue with verification
        socket.emit("application:aproval:error", {
            error: "Verification Error",
        });
    }
});
const createReferral = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const user = yield databaseHandler_1.default.user.referral(data);
        // Emit success event
        socket.emit("referral:registration:success", user);
    }
    catch (error) {
        console.log(error);
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap = {
                email: "Email already exists.",
            };
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:registration:failed", {
                        error: fieldErrorMap[field],
                    });
                    break;
                }
            }
        }
    }
});
exports.default = { list, create, createReferral, verify };
