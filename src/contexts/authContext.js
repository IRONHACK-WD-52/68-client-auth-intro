import { createContext, useState, useEffect } from "react";

// Context é um API do React que permite a criação de um "state global" que pode ser compartilhado entre componentes sem a necessidade de passar props
const AuthContext = createContext({ token: "", user: {} }); // O createContext recebe o estado inicial do Context

function AuthContextComponent(props) {
  const [state, setState] = useState({ token: "", user: {} });
  // State intermediário para permitir que o useEffect termine de procurar o usuário logado antes de redirecionar a rota de volta pro login
  // Ver ProtectedRoute.js linha 12
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checa se temos um usuário armazenado previamente no computador do usuário. Caso não tenha, criamos uma string JSON vazia
    const stored = window.localStorage.getItem("loggedInUser") || '""';

    // Interpreta a string JSON de volta para javascript
    const storedUser = JSON.parse(stored);

    // Caso exista um usuário logado, atualize o state global do context
    if (storedUser.user) {
      setState({ ...storedUser });
    }
  }, []);

  useEffect(() => setLoading(false), [state.user]);

  function logoff() {
    // Esvaziar o state do Context
    setState({ token: "", user: {} });
    // Apagar os dados armazenados no localStorage
    window.localStorage.removeItem("loggedInUser");
  }

  // Provider é o componente que efetivamente disponibiliza o state global para todos seus componentes filhos. O que vai ser efetivamente compartilhado com os componentes filhos é o que for passado como valor para a prop 'value'
  // Ver App.js linha 10
  return (
    // Ver Login.js linhas 18 e 34
    <AuthContext.Provider value={[state, setState, loading, logoff]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
