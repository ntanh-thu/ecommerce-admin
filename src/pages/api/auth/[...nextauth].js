import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Users } from "@/models/Users";
import clientPromise from "../../../../lib/mongodb";
import { adminEmailList } from "@/constants/admin/admin-mail-list";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const user = await Users.findOne({ username });
        const hashedPassword = bcrypt.compareSync(password, user.password);
        if (user && hashedPassword) {
          return user;
        } else {
          return null;
        }
        // Add logic here to look up the user from the credentials supplied
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      session.token = token;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    newUser: "/sign-in", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "http://localhost:3000/favicon.ico", // Absolute URL to image
    buttonText: "", // Hex color code
  },
};

export default NextAuth(authOption);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOption);
  if (!adminEmailList.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
