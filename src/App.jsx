import { Routes, Route } from "react-router-dom";
import Search from "./pages/search";
import ImageDetails from "./pages/imagedetail";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Search/>} />
      <Route path="/image/:id" element={<ImageDetails/>} />
    </Routes>
  );
}

export default App;
