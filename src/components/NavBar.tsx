import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <nav className="flex gap-4 justify-center">
        <Link to="/">Home</Link>
        <Link to="/collection">My Collection</Link>
      </nav>
    </header>
  );
}

export default NavBar;
