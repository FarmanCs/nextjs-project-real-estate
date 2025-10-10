// "use client";

// import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
// import { useSession } from "next-auth/react";
// import { setupDevBundler } from "next/dist/server/lib/router-utils/setup-dev-bundler";

// const { createContext, useState, useContext, useEffect } = require("react");

// //create context
// const GlobalContext = createContext();

// //create context provider
// export async function GlobalContextProvider({ children }) {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session && session.user) {
//       getUnreadMessageCount().then((res) => {
//         if (res.countUnreadMessages) {
//           setupDevBundler(res.countUnreadMessages);
//         }
//       });
//     }
//   }, [session, getUnreadMessageCount]);
//   return (
//     <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// }

// //create useContext
// export function useGlobalContext() {
//   return useContext(GlobalContext);
// }
"use client";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

// create context
const GlobalContext = createContext();

// create context provider
export function GlobalContextProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount()
        .then((res) => {
          if (res && res.countUnreadMessages !== undefined) {
            setUnreadCount(res.countUnreadMessages);
          }
        })
        .catch((err) => console.error("Error fetching unread count:", err));
    }
  }, [session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// custom hook
export function useGlobalContext() {
  return useContext(GlobalContext);
}
