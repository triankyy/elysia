import Elysia, { t } from "elysia";
import { prisma } from "~/libs/prisma";
import { authModel } from "./model";

export const register = new Elysia().use(authModel).post(
    "/register",
    async function ({ body, set }) {
        const { email, password, name } = body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            set.status = 400;
            return {
                message: "Email already in use",
            };
        }

        const savedPassword = await Bun.password.hash(password);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: savedPassword,
            },
        });
        set.status = 201;
        return {
            message: "Account created",
            data: user,
        };
    },
    {
        body: "register",
        detail: {
            tags: ["AUTH", "USERS"],
        },
    }
);
