import AddObject from "@/components/Addstock";
import SearchBox from "@/components/SearchBox";
import ShowObjects from "@/components/ShowStock";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <SearchBox />
    <AddObject />
    <ShowObjects />
    </>
  );
}
