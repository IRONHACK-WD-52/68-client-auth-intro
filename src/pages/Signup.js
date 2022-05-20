import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Se as senhas forem iguais nos dois campos, envie os dados do formulário para nossa API

      if (state.password !== state.confirmPassword) {
        throw new Error("As senhas não conferem!");
      }

      const response = await axios.post("http://localhost:4000/signup", state);

      console.log(response.data);
      // Redireciona para o login
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Novo usuário</h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Nome"
          name="name"
          id="signupFormName"
          value={state.name}
          onChange={handleChange}
        />
        <FormControl
          label="E-mail"
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          onChange={handleChange}
        />
        <FormControl
          label="Senha"
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          onChange={handleChange}
        />
        <FormControl
          label="Confirme a senha"
          type="password"
          name="confirmPassword"
          id="signupFormConfirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />

        <FormButton>Cadastrar</FormButton>
      </form>
    </div>
  );
}

export default Signup;
