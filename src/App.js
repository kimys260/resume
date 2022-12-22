import Main from "$components/main";
import Portfolio from "$components/portfolio";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./404";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
