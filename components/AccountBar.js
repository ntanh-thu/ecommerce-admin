import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import * as pathName from "../constants/pathName";
import { pages } from "../constants/pageName";

export default function AccountBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="account-bar">
      <div>{pages[pathname]}</div>
      <div className="account-bar-profile">
        <img src={session?.user?.image} alt="" className="" />
      </div>
    </div>
  );
}
