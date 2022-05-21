import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Como setamos o "from" no state do Navigate anteriormente, ele estará disponível na página de Login contendo a rota que usuário tentou acessar sem estar logado
  const from = location.state?.from?.pathname || "/"; // Optional chaining: o "?" evita que o Javascript tente acessar uma propriedade (from) caso o valor atual seja undefined (state)

  // O useContext é um hook que recebe a instância do Context criada previamente e retorna o que está sendo passado para a prop 'value' do Provider. Dessa forma, podemos acessar o state de usuário logado sem precisar passar props de nenhum componente para outro
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  function handleChange({ target }) {
    const { name, value } = target;

    setState({ ...state, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);

      console.log(response.data);

      // E também podemos manipular esse state global de forma centralizada através da função compartilhada pelo Provider
      setLoggedInUser({ ...response.data });
      // Armazena os dados do usuário logado de forma persistente (sobrevive a recarrementos da página ou até mesmo fechar o navegador) no computador do usuário
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );

      // Redireciona o usuário para a página que ele tentou acessar ao invés de redirecionar para home
      navigate(from, { replace: true }); // O replace substitui a rota atual do histórico de rotas pela próxima. Dessa forma, o usuário não voltará para a página de login caso ele volte para a página anterior.
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
