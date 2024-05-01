import Elysia from "elysia";
import { authPlugin } from "~/plugins/auth";

export const logout = new Elysia().use(authPlugin).get(
    "/logout",
    function ({ cookie: { access_token }, set, user }) {
        // access_token.remove(); // Use set instead of remove, because delete still has bugs in Elysia. See https://github.com/elysiajs/elysia/issues/536
        access_token.set({
            maxAge: 0,
            path: "/",
        });
        set.status = 200;
        return {
            message: "Logout successfully",
        };
    },
    {
        detail: {
            tags: ["AUTH"],
        },
    }
);
