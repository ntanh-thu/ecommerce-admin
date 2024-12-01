import { adminEmailList } from "@/constants/admin/admin-mail-list";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req, "req");
  },
  {
    callbacks: {
      authorized: (auth) => {
        if (!auth?.token?.accessToken) {
          return false;
        }
        if (!!auth.token.accessToken && adminEmailList.includes(auth.token.email)) {
          return true;
        }
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
