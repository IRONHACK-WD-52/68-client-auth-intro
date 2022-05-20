import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

import { AuthContext } from "../contexts/authContext";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // O useContext é um hook que recebe a instância do Context criada previamente e retorna o que está sendo passado para a prop 'value' do Provider. Dessa forma, podemos acessar o state de usuário logado sem precisar passar props de nenhum componente para outro
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  function handleChange({ target }) {
    const { name, value } = target;

    setState({ ...state, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", state);

      console.log(response.data);

      // E também podemos manipular esse state global de forma centralizada através da função compartilhada pelo Provider
      setLoggedInUser({ ...response.data });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Entrar</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          label="E-mail"
          id="loginFormEmail"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
        />
        <FormControl
          label="Senha"
          id="loginFormPassword"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <FormButton>Entrar</FormButton>
      </form>
    </div>
  );
}

export default Login;
