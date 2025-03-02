import LogoName from "./LogoName";
import SearchBar from "./SearchBar";


export default function SidebarTop() {
    return(
        <div className="grid w-full h-16 p-2 bg-red-500 items-center grid-cols-8 grid-rows-1">
                <SearchBar></SearchBar>
                <LogoName></LogoName>
        </div>
    );
}