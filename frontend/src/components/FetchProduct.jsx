import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

function FetchProduct() {

  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {

    if (!barcode) return;

    try {
      const response = await axios.get(
        `${API}/fetch-product/${barcode}`
      );

      setProduct(response.data);

    } catch (err) {
      alert("Product not found.");
      setProduct(null);
    }
  };

  return (

    <div className="fetch-box">

      <h2>Fetch Product</h2>

      <input
        placeholder="Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />

      <button onClick={fetchProduct}>
        Search
      </button>

      {product && (

        <div className="product-card">

          <h3>{product.name}</h3>

          <p><strong>Brand:</strong> {product.brand}</p>

          <p><strong>Category:</strong> {product.category}</p>

        </div>

      )}

    </div>

  );
}

export default FetchProduct;