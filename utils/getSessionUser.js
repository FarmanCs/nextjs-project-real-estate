import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOption";

async function getSessionUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSessionUser;

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/AuthOption";

// async function getSessionUser() {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return null;
//   }
//   return {
//     user: session.user,
//     userId: session.user.id,
//   };

//   console.error(error);
//   return null;
// }

// export default getSessionUser;
