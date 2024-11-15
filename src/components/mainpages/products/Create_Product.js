import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Create_Product.css";

const Create_Product = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    product_id: "",
    title: "",
    price: "",
    description: "",
    images: "",
  });
  const [products, setProducts] = useState(); // State to hold all products
  const [editId, setEditId] = useState(null); // ID of product being edited

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://car-rms-backend.vercel.app/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://car-rms-backend.vercel.app/api/products/${editId}`, { ...user });
      } else {
        await axios.post("https://car-rms-backend.vercel.app/api/products", { ...user });
      }
      fetchProducts(); // Refresh the product list
      setUser({ product_id: "", title: "", price: "", description: "", images: "" }); // Reset form
      setEditId(null); // Reset edit mode
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id); // Set ID for editing
    setUser(product); // Populate the form with product data
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://car-rms-backend.vercel.app/api/products/${id}`);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <form className="form-horizontal" onSubmit={formSubmit}>
        <fieldset>
          <legend>{editId ? "Update Product" : "Add Product"}</legend>

          {/* Product ID */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="product_id">
              Product ID
            </label>
            <div className="col-md-4">
              <input
                id="product_id"
                name="product_id"
                type="text"
                placeholder="Product ID"
                onChange={onChangeInput}
                value={user.product_id}
                className="form-control input-md"
                disabled={!!editId} // Disable field if updating an existing product
              />
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="title">
              Title
            </label>
            <div className="col-md-4">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                onChange={onChangeInput}
                value={user.title}
                className="form-control input-md"
              />
            </div>
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="price">
              Price
            </label>
            <div className="col-md-4">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                onChange={onChangeInput}
                value={user.price}
                className="form-control input-md"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="description">
              Description
            </label>
            <div className="col-md-4">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                onChange={onChangeInput}
                value={user.description}
                className="form-control input-md"
              />
            </div>
          </div>

          {/* Images */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="images">
              Image URL
            </label>
            <div className="col-md-4">
              <input
                id="images"
                name="images"
                type="text"
                placeholder="Image URL"
                onChange={onChangeInput}
                value={user.images}
                className="form-control input-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <div className="col-md-4">
              <button
                type="submit"
                id="singlebutton"
                name="singlebutton"
                className="btn btn-primary"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </fieldset>
      </form>

      {/* Product Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {products && products.products.map((product) => (
    <tr key={product._id}>
      <td>{product.product_id}</td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>
        <img
          src={product.images}
          alt={product.title}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => handleEdit(product)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </>
  );
};

export default Create_Product;
