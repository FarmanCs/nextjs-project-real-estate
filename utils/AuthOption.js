import connectDB from "@/config/database";
import User from "@/model/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        await connectDB();

        // 1 Check if user exists
        const existingUser = await User.findOne({ email: profile.email });

        // 2 If not, create a new one
        if (!existingUser) {
          const username = profile.name
            ? profile.name.slice(0, 15)
            : profile.email.split("@")[0];

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        } else {
          console.log(" Existing user found:", profile.email);
        }

        // 3  return true to allow sign-in
        return true;
      } catch (err) {
        console.error(" Error during sign-in:", err);
        return false;
      }
    },

    async session({ session }) {
      await connectDB();

      const user = await User.findOne({ email: session.user.email });

      if (user) {
        session.user.id = user._id.toString();
      } else {
        console.error(" No user found for email:", session.user.email);
      }

      return session;
    },
  },
};
