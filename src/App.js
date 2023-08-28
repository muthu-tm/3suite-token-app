import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./styles/globalStyles.css";
import HomePage from "./pages/HomePage";
import DeployToken from "./components/DeployToken/DeployToken";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="*" element={<HomePage />} exact />
      <Route path="token-deploy" element={<DeployToken />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
