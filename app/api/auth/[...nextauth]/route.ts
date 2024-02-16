import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface ExtendedSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
}

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Error while taking GCP credentials");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],

  callbacks: {
    async session({ session }: { session: ExtendedSession }) {
      await connectToDB();

      if (session.user && session.user.email) {
        const userSession = await User.findOne({ email: session.user.email });
        if (userSession) {
          if (!session.user.id) {
            session.user.id = userSession._id.toString();
          }
        }
      }
      return session;
    },

    async signIn({ profile }) {
      await connectToDB();
      const userExists = await User.findOne({ email: profile?.email });

      if (!userExists) {
        const newUser = {
          email: profile?.email,
          username: profile?.name?.replace(" ", "").toLowerCase(),
          image: (profile as any)?.picture,
        };

        await User.create(newUser);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
