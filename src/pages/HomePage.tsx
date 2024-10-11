import { useState } from "react";

function HomePage() {
  const [example, setExample] = useState(0);

  return (
    <section className="flex flex-col items-center">
      <h1 className="font-sans text-xl p-2">Current value: {example}</h1>
      <button
        className="w-32 border-2 rounded-xl shadow bg-white hover:bg-gray-100"
        onClick={() => setExample((i) => i + 1)}
      >
        <p className="p-2">Click me</p>
      </button>
    </section>
  );
}

export default HomePage;
