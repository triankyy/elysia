import Elysia from "elysia";
import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";

export const authRoute = new Elysia({
    prefix: "/auth",
})
    .use(register)
    .use(login)
    .use(logout);
