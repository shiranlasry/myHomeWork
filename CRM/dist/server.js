"use strict";
//server
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = require("./API/user/middelware/users");
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(cookie_parser_1.default());
//static files
app.use(express_1.default.static("public"));
//body
app.use(express_1.default.json());
const { MONGO_URI } = process.env;
// for req loged in user detalis
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
app.use(users_1.getLoggedUser);
const userRoutes_1 = __importDefault(require("./API/user/userRoutes"));
app.use("/API/user", userRoutes_1.default);
const departmentRoutes_1 = __importDefault(require("./API/department/departmentRoutes"));
app.use("/API/department", departmentRoutes_1.default);
const inquiryRoutes_1 = __importDefault(require("./API/inquiry/inquiryRoutes"));
app.use("/API/inquiry", inquiryRoutes_1.default);
const caseRoutes_1 = __importDefault(require("./API/case/caseRoutes"));
app.use("/API/case", caseRoutes_1.default);
const titleRoutes_1 = __importDefault(require("./API/title/titleRoutes"));
app.use("/API/title", titleRoutes_1.default);
const complainantRoutes_1 = __importDefault(require("./API/complainant/complainantRoutes"));
app.use("/API/complainant", complainantRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
