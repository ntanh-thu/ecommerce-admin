import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import * as pathName from "../constants/pathName";
import { pages } from "../constants/pageName";

export default function AccountBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const filterPage = Object.keys(pages)
    .map((path) => {
      return pathname.includes(path) ? path : undefined;
    })
    .filter((item) => item !== undefined);
  function compareNumbers(a, b) {
    return b.length - a.length;
  }
  const sortPage = filterPage.sort(compareNumbers);

  return (
    <div className="account-bar">
      <div>{pages[sortPage[0]]}</div>
      <div className="account-bar-profile">
        <img src={session?.user?.image} alt="" className="" />
      </div>
    </div>
  );
}
