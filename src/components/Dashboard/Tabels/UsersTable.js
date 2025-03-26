import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function UsersTable() {
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
    { id: 5, name: 'Charlie White', email: 'charlie@example.com', role: 'Admin' },
    { id: 6, name: 'David Black', email: 'david@example.com', role: 'User' },
    { id: 7, name: 'Emma Wilson', email: 'emma@example.com', role: 'Admin' },
    { id: 8, name: 'Frank Harris', email: 'frank@example.com', role: 'User' },
    { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'User' },
    { id: 10, name: 'Henry Martin', email: 'henry@example.com', role: 'Admin' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSortById = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    );
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setUsers(sortedUsers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>Users Table</h2>
      <Form.Control
        type="text"
        placeholder="Search users..."
        onChange={handleSearch}
        className="mb-3"
      />
      <Button variant="primary" onClick={handleSortById} className="mb-2">
        Sort by ID ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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

export default UsersTable;
