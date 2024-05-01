import Elysia from "elysia";
import { excludeFromObject, prisma } from "~/libs/prisma";
import { authPlugin } from "~/plugins/auth";

export const getOneUser = new Elysia().use(authPlugin).get(
    "/:id",
    async function ({ params: { id }, set }) {
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
        });
        if (!user) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }
        return {
            message: "Success",
            data: excludeFromObject(user, ["password"]),
        };
    },
    {
        detail: {
            tags: ["USERS"],
        },
    }
);
