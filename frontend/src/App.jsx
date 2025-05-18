import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import Compare from "./pages/Compare";
import About from "./pages/About";
import NavBar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
