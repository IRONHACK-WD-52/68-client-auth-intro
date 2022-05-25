import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const [loggedInUser, setLoggedInUser, loading, logoff] =
    useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          IronStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {loggedInUser.user._id ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={(isActive) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(isActive) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/product/create"
                  >
                    Novo Produto
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={(isActive) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/signup"
                  >
                    Cadastre-se
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(isActive) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/login"
                  >
                    Entrar
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {loggedInUser.user._id && (
            <div>
              <span className=" text-light">
                Bem-vindo, {loggedInUser.user.name}
              </span>
              <button className="btn btn-link text-light" onClick={logoff}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
