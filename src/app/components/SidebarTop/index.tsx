import LogoName from "./LogoName";
import SearchBar from "./SearchBar";
import LinkedinAcess from "./LinkedinAcess";

export default function SidebarTop() {
    return (
        <div className="grid w-full h-[8vh] p-2 bg-red-500 grid-cols-8 items-center">
                <LogoName></LogoName>
                <SearchBar></SearchBar>
                <LinkedinAcess></LinkedinAcess>

        </div>
    );
}