import { createContext, useState } from "react";

// Context é um API do React que permite a criação de um "state global" que pode ser compartilhado entre componentes sem a necessidade de passar props
const AuthContext = createContext({ token: "", user: {} }); // O createContext recebe o estado inicial do Context

function AuthContextComponent(props) {
  const [state, setState] = useState({ token: "", user: {} });

  // Provider é o componente que efetivamente disponibiliza o state global para todos seus componentes filhos. O que vai ser efetivamente compartilhado com os componentes filhos é o que for passado como valor para a prop 'value'
  // Ver App.js linha 10
  return (
    // Ver Login.js linhas 18 e 34
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
