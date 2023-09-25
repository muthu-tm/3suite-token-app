import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./styles/globalStyles.css";
import HomePage from "./pages/HomePage";
import DeployToken from "./components/DeployToken/DeployToken";
import Multisender from "./components/MultiSender/Multisender";
import MainActivity from "./components/UserActivity/MainActivity";
import SingleActivity from "./components/UserActivity/SingleActivity";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="*" element={<HomePage />} exact />
      <Route path="token-deploy" element={<DeployToken />} />
      <Route path="multi-sender" element={<Multisender />} />
      <Route path="user-activity" element={<MainActivity />} />
      <Route path="view-activity" element={<SingleActivity />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
