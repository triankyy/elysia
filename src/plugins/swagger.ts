import swagger from "@elysiajs/swagger";

export const swaggerPlugin = () =>
    swagger({
        path: "/docs",
        exclude: ["/docs", "/docs/json"],
        documentation: {
            info: {
                title: "Elysia Documentation",
                version: "1.0.0",
            },
        },
    });
