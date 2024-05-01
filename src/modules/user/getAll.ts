import Elysia from "elysia";
import { excludeFromList, prisma } from "~/libs/prisma";
import { authPlugin } from "~/plugins/auth";

export const getAllUsers = new Elysia().use(authPlugin).get(
    "/all",
    async function () {
        const users = await prisma.user.findMany();
        return {
            message: "Success",
            data: excludeFromList(users, ["password"]),
        };
    },
    {
        detail: {
            tags: ["USERS"],
        },
    }
);
