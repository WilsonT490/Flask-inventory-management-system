function Summary({ items }) {

  const totalProducts = items.length;

  const totalStock = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const totalValue = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (

    <div className="summary">

      <div className="card">
        <h3>Products</h3>
        <h2>{totalProducts}</h2>
      </div>

      <div className="card">
        <h3>Stock</h3>
        <h2>{totalStock}</h2>
      </div>

      <div className="card">
        <h3>Total Value</h3>
        <h2>${totalValue.toFixed(2)}</h2>
      </div>

    </div>

  );
}

export default Summary;