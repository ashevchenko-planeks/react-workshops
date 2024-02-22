import Sidebar from "@/components/Sidebar";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useContext } from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-2">{user && <Sidebar />}</div>
      <div className="col-span-10">{children}</div>
    </div>
  );
}
