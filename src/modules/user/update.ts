import Elysia, { t } from "elysia";
import { excludeFromObject, prisma } from "~/libs/prisma";
import { authPlugin } from "~/plugins/auth";
import { authDto } from "../auth/model";

export const updateUser = new Elysia().use(authPlugin).patch(
    "/:id",
    async function ({ set, body, params: { id } }) {
        const { name, email } = body;
        const userExist = await prisma.user.findFirst({ where: { id } });
        if (!userExist) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }
        const user = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
            },
        });
        return {
            message: "Update successfully",
            data: excludeFromObject(user, ["password"]),
        };
    },
    {
        body: t.Omit(authDto, ["password"]),
        detail: {
            tags: ["USERS"],
        },
    }
);
