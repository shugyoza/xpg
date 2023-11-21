"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const server = (0, express_1.default)();
const corsOptions = {
    origin: `http://localhost:${PORT}`
};
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.get('/', (request, response) => {
    response.send('Connected to XPG...');
});
server.listen(PORT, () => console.log(`Server is listening at http://${hostname}:${PORT}`));
//# sourceMappingURL=main.js.map