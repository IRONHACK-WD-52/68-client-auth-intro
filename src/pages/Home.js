import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../contexts/authContext";

function Home() {
  const [products, setProducts] = useState([]);

  const [loggedInUser] = useContext(AuthContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:4000/product", {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        });

        console.log(response.data);

        setProducts([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    if (loggedInUser.token) {
      fetchProducts();
    }
  }, [loggedInUser.token]);

  return (
    <div>
      <div className="row">
        {products.map((product) => {
          const { name, price, pictureUrl } = product;

          return (
            <div className="col-4">
              <div className="card" style={{ width: "18rem" }}>
                <img src={pictureUrl} className="card-img-top" alt={name} />
                <div className="card-body">
                  <h5 className="card-title">
                    {price.toLocaleString(window.navigator.language, {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h5>
                  <p className="card-text">{name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
