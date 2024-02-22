import { useContext } from "react";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Sidebar from "@/components/Sidebar";
import ProductForm from "@/components/ProductForm";

export default function Products() {
    const user = useContext(CurrentUserContext);
  return (
   <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-2">
                {user && <Sidebar  />}
            </div>
            <div className="col-span-10">
               <ProductForm/>
            </div>
        </div>
  )
}
