import React, { useEffect, useState } from 'react';

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: "", description: "" });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleCreateProduct = () => {
    const newProductEntry = { id: Date.now(), ...newProduct };
    const updatedProducts = [...products, newProductEntry];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProduct({ title: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <div className='mt-8'>
        <h1 className='text-center text-4xl mb-16'>RBAC DEVELOPED BY <a href='https://www.linkedin.com/in/anjney-mishra-75a19422b/' target='_blank' className='underline text-primary'>ANJNEY MISHRA</a></h1>
      <h2 className='text-center text-xl font-bold'>OUR PRODUCTS</h2>

      {roles &&roles[userRole]?.includes("create") ? (
        <div className="text-center mb-4 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Product
          </button>
        </div>
      ):<></>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products?.map((product) =>
          editingProduct?.id === product.id ? (
            <div key={product.id} className="card border shadow-lg p-4">
              <input
                type="text"
                defaultValue={product.title}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, title: e.target.value })
                }
                className="input input-bordered w-full mb-2"
              />
              <textarea
                defaultValue={product.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="textarea textarea-bordered w-full"
              ></textarea>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleUpdateProduct(editingProduct)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={product.id} className="card border border-primary shadow-lg p-4">
              <h2 className="text-xl font-bold text-primary">{product.title}</h2>
              <p className="text-gray-300 pt-6">{product.description}</p>
              <div className="flex justify-between mt-2">
                {roles[userRole]?.includes("update") && (
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                )}
                {roles[userRole]?.includes("delete") && (
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create New Product</h3>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Product Title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="input input-bordered w-full mb-2"
              />
              <textarea
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleCreateProduct}
              >
                Save
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
