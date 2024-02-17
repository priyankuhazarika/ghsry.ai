import { ZodError } from "zod";
import cookie from "cookie";
import superjson from "superjson";
import { prisma } from "@ghsry.ai/prisma";
import { type inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

/* Context */

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  prisma,
  req,
  res,
});

export type Context = inferAsyncReturnType<typeof createContext>;

/* Initialize tRPC */

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;

    let customErrorMessage = shape.message;

    if (error.code === "BAD_REQUEST" && error.cause instanceof ZodError) {
      customErrorMessage = error.cause.errors
        .map((e) => e.message)
        .join("; \n");
    }

    return {
      ...shape,
      message: customErrorMessage,
    };
  },
});

/* Middlewares */

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const cookies = cookie.parse(ctx.req.header("cookie") ?? "");

  // Check if user is logged in
  const authToken = cookies["auth-token"];

  if (!authToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const session = await ctx.prisma.session.findUnique({
    where: { id: authToken },
    include: {
      User: {
        include: {
          Memberships: {
            include: { Role: true },
          },
        },
      },
    },
  });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session,
    },
  });
});

/* Procedures */

export const router = t.router;

/** No restrictions */
export const publicProcedure = t.procedure;

/** Requires user to be logged in */
export const authProcedure = t.procedure.use(authMiddleware);
