import cookie from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authRoute } from "./modules/auth/route";
import { userRoute } from "./modules/user/route";
import { swaggerPlugin } from "./plugins/swagger";

const app = new Elysia()
    .use(cookie())
    .use(cors())
    .use(swaggerPlugin())
    .onAfterHandle(function ({ set, response, path }) {
        if (path != "/docs") {
            const data = response as object;
            set.headers["Content-Type"] = "application/json; charset=utf-8";
            return {
                statusCode: set.status,
                ...data,
            };
        }
    })
    .onError(function ({ set }) {
        set.headers["Content-Type"] = "application/json; charset=utf-8";
    })
    .get("/", (data) => {
        return {
            message: "Hello, Elysia!",
        };
    })
    .use(authRoute)
    .use(userRoute)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
