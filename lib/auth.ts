import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { nextCookies } from "better-auth/next-js"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  user: {
    deleteUser: {
      enabled: true,
    },
    // additionalFields: {
    //   role: {
    //     type: "string",
    //     defaultValue: "user",
    //   },
    // },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [nextCookies()],
})
