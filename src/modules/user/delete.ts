import Elysia from "elysia";
import { excludeFromObject, prisma } from "~/libs/prisma";
import { authPlugin } from "~/plugins/auth";

export const deleteUser = new Elysia().use(authPlugin).delete(
    "/:id",
    async function ({ set, params: { id } }) {
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }

        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        return {
            message: "Delete user successfully",
            data: excludeFromObject(deletedUser, ["password"]),
        };
    },
    {
        detail: {
            tags: ["USERS"],
        },
    }
);
