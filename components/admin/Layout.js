import { useSession, signIn } from "next-auth/react";
import Nav from "./Nav";
import { useState } from "react";
import Logo from "./Logo";
import AccountBar from "./AccountBar";
import { roles } from "../../constants/roles";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="bg-white w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => {
              signIn("google");
            }}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  } else if (session?.infor?.role !== roles[0]) {
    router.replace("/");
  }
  return (
    <div className="bg-white min-h-screen">
      <div className=" md:hidden flex items-center justify-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex min-h-screen">
        <Nav show={showNav} />
        <div className="w-full h-screen bg-[#F5F7FA]">
          <AccountBar />
          <div className="px-10 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
