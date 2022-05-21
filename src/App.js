import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import ProductCreate from "./pages/product/ProductCreate";

import { AuthContextComponent } from "./contexts/authContext";

function App() {
  return (
    <div>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          {/* Envelopamos todas as rotas da aplicação com o Provider para que todas tenham acesso ao usuário logado */}

          <Routes>
            <Route path="/" element={<ProtectedRoute component={Home} />} />
            <Route
              path="/product/create"
              element={<ProtectedRoute component={ProductCreate} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthContextComponent>
    </div>
  );
}

export default App;
