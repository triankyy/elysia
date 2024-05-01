import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const authDto = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
});

export const authModel = new Elysia().model({
    register: authDto,
    login: t.Omit(authDto, ["name"]),
});
