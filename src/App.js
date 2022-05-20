import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { AuthContextComponent } from "./contexts/authContext";

function App() {
  return (
    <div>
      <div className="container mt-5">
        {/* Envelopamos todas as rotas da aplicação com o Provider para que todas tenham acesso ao usuário logado */}
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </div>
  );
}

export default App;
