import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

function AnalyticsTable() {
  const initialAnalytics = [
    { metric: 'Visits', value: '1,240', change: '+12%' },
    { metric: 'Sales', value: '$5,430', change: '+8%' },
    { metric: 'Signups', value: '320', change: '+15%' },
    { metric: 'Bounce Rate', value: '45%', change: '-5%' },
    { metric: 'Conversion Rate', value: '2.4%', change: '+0.5%' },
    { metric: 'Revenue', value: '$12,500', change: '+10%' },
    { metric: 'Ad Clicks', value: '7,890', change: '+20%' },
    { metric: 'New Customers', value: '450', change: '+18%' },
    { metric: 'Returning Customers', value: '780', change: '+5%' },
    { metric: 'Customer Satisfaction', value: '89%', change: '+2%' }
  ];

  const [data, setData] = useState(initialAnalytics);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const numA = parseFloat(a.change);
      const numB = parseFloat(b.change);
      return sortOrder === 'asc' ? numA - numB : numB - numA;
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setData(sortedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    item.metric.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>Analytics</h2>
      <Form.Control
        type="text"
        placeholder="Search metrics..."
        onChange={handleSearch}
        className="mb-3"
      />
      <Button variant="primary" onClick={handleSort} className="mb-2">
        Sort by Change ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.metric}</td>
              <td>{item.value}</td>
              <td>{item.change}</td>
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

export default AnalyticsTable;
