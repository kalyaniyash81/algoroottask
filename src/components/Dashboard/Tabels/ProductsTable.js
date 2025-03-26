import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

function ProductsTable() {
  const initialProducts = [
    { id: 1, name: 'Laptop', price: 1000, stock: 15 },
    { id: 2, name: 'Mobile', price: 500, stock: 8 },
    { id: 3, name: 'Tablet', price: 700, stock: 25 },
    { id: 4, name: 'Smartwatch', price: 300, stock: 5 },
    { id: 5, name: 'Headphones', price: 150, stock: 12 },
    { id: 6, name: 'Monitor', price: 400, stock: 20 },
    { id: 7, name: 'Keyboard', price: 100, stock: 30 },
    { id: 8, name: 'Mouse', price: 50, stock: 18 },
    { id: 9, name: 'Printer', price: 250, stock: 10 },
    { id: 10, name: 'Router', price: 120, stock: 22 }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setProducts(sortedProducts);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>Products</h2>
      <Form.Control
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="mb-3"
      />
      <Button variant="primary" onClick={handleSort} className="mb-2">
        Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-controls">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ProductsTable;