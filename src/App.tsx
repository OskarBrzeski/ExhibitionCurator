import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";

function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </main>
  );
}

export default App;
