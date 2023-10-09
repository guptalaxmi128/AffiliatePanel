import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyLayout from "./componets/layout/MyLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MyLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
