import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <div className="flex flex-col absolute top-[25%] px-2 sm:px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl">
          Hello, <span className="text-primary">John Doe</span>
        </h1>
        <h2 className="text-xl">Got an idea? Let’s find the perfect domain.</h2>
      </div>
      <div className="max-w-2xl w-full mt-12">
        <SearchBar />
      </div>
    </div>
  );
}
