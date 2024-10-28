import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="border-b-2 mt-2 mb-4 mx-2">
      <nav className="flex gap-6 justify-center">
        <Link to="/">Search</Link>
        <Link to="/collection?pagesize=5&page=1">My Collection</Link>
        <Link to="/exhibition">Exhibition</Link>
      </nav>
    </header>
  );
}

export default NavBar;
