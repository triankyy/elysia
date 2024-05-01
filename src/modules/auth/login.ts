import Elysia from "elysia";
import { excludeFromObject, prisma } from "~/libs/prisma";
import cookie from "@elysiajs/cookie";
import { jwtPlugin } from "~/plugins/jwt";
import { authModel } from "./model";

export const login = new Elysia()
    .use(authModel)
    .use(jwtPlugin)
    .post(
        "/login",
        async function ({ body, set, jwt, cookie: { access_token } }) {
            const { email, password } = body;
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                set.status = 403;
                return {
                    message: "Invalid credentials!",
                };
            }

            const validPassword = await Bun.password.verify(
                password,
                user.password
            );
            if (!validPassword) {
                set.status = 403;
                return {
                    message: "Invalid credentials!",
                };
            }

            const accessToken = await jwt.sign({
                id: user.id,
            });
            access_token.set({
                httpOnly: true,
                value: accessToken,
                path: "/",
            });
            return {
                message: "Account login successfully",
                data: excludeFromObject(user, ["password"]),
            };
        },
        {
            body: "login",
            detail: {
                tags: ["AUTH"],
            },
        }
    );
