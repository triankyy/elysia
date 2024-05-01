import { Elysia } from "elysia";
import { prisma } from "~/libs/prisma";
import { jwtPlugin } from "./jwt";

export function authPlugin(app: Elysia) {
    return app
        .use(jwtPlugin)
        .derive(async function ({ cookie: { access_token }, jwt }) {
            let id = "";
            const payload = await jwt.verify(access_token.value);
            if (payload) {
                id = payload.id;
            }
            return { id };
        })
        .onBeforeHandle(function ({ id, set }) {
            if (!id) {
                set.status = 401;
                return {
                    message: "Unauthorized",
                };
            }
        })
        .derive(async function ({ id }) {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });

            return { user };
        })
        .onBeforeHandle(function ({ user, set }) {
            if (!user) {
                set.status = 401;
                return {
                    message: "Unauthorized",
                };
            }
        });
}
