import Elysia from "elysia";
import { getAllUsers } from "./getAll";
import { getOneUser } from "./getOne";
import { updateUser } from "./update";
import { deleteUser } from "./delete";

export const userRoute = new Elysia({
    prefix: "/user",
})
    .use(getAllUsers)
    .use(getOneUser)
    .use(updateUser)
    .use(deleteUser);
