import { useContext, useState, useEffect } from "react";

import FormControl from "../../components/FormControl";
import FormButton from "../../components/FormButton";

import api from "../../apis/api";

function ProductCreate() {
  const [state, setState] = useState({
    name: "",
    description: "",
    inStock: 0,
    price: 10,
    picture: "",
  });

  function handleChange({ target }) {
    const { name, value, files } = target;

    if (files) {
      setState({ ...state, [name]: files[0] });
      return;
    }

    setState({ ...state, [name]: value });
  }

  async function handleFileUpload(file) {
    // 1. Criar uma instância da construtora FormData
    const formData = new FormData();

    // 2. Criar um campo para armazenar nosso arquivo nessa instância
    formData.append("picture", file); // O primeiro argumento de append precisa ser a mesma string passada para o método 'single' do middleware uploader na sua rota do backend

    // 3. Enviar essa instância para a API
    const response = await api.post("/upload", formData);

    return response.data;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      // Envia o arquivo que o usuário selecionou para a rota de upload de arquivo
      if (state.picture) {
        const { fileUrl } = await handleFileUpload(state.picture);

        const clone = { ...state };

        delete clone.picture;

        const response = await api.post("/product", {
          ...clone,
          pictureUrl: fileUrl,
        });

        console.log(response.data);
      } else {
        await api.post("/product", state);
      }

      // Mandar os dados do produto pra API
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Product Create</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          label="Nome do produto"
          id="productFormName"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <FormControl
          label="Descrição"
          id="productFormDescription"
          name="description"
          onChange={handleChange}
          value={state.description}
        />
        <FormControl
          label="Quantidade em estoque"
          id="productFormInStock"
          type="number"
          min={0}
          name="inStock"
          onChange={handleChange}
          value={state.inStock}
        />
        <FormControl
          label="Preço de venda"
          id="productFormPrice"
          type="number"
          min={10}
          name="price"
          onChange={handleChange}
          value={state.price}
        />
        <FormControl
          label="Imagem do produto"
          id="productFormPicture"
          type="file"
          name="picture"
          onChange={handleChange}
        />

        <FormButton>Salvar</FormButton>
      </form>
    </div>
  );
}

export default ProductCreate;
