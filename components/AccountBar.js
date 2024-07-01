import { useSession } from "next-auth/react";

export default function AccountBar({ className = "" }) {
  const { data: session } = useSession();
  return (
    <div className={"text-blue-900 flex justify-end pb-4 " + className}>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg over">
        <img src={session?.user?.image} alt="" className="w-6 h-6" />
        <span className="px-2">{session?.user?.name}</span>
      </div>
    </div>
  );
}
