import Image from "next/image";
import SidebarTop from "./components/SidebarTop";

export default function Home() {
  return (
    <div>
        <SidebarTop></SidebarTop>

        <div className="grid absolute block w-full h-full grid-cols-8 ">
          <div className="w-full h-full bg-green-500 grid-col-start-1 col-end-2">
            left-bar
          </div>
          <div className="w-full h-full bg-purple-500 col-span-7">
          content
          </div>

        </div>
    </div>
  );
}
