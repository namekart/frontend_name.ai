import SearchBar from "@/components/search-bar";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col absolute top-[25%] px-2 sm:px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl">
          Hello,{" "}
          <span className="text-primary">
            {session?.user?.name?.split(" ")[0] || "Guest"}
          </span>
        </h1>
        <h2 className="text-xl">Got an idea? Let’s find the perfect domain.</h2>
      </div>
      <div className="max-w-2xl w-full mt-12">
        <SearchBar />
      </div>
    </div>
  );
}
