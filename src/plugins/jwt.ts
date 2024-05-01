import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const jwtPlugin = new Elysia({ name: "jwt" }).use(
    jwt({
        name: "jwt",
        schema: t.Object({
            id: t.String(),
        }),
        secret: Bun.env.JWT_SECRET!,
    })
);
