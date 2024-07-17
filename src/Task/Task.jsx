import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Mock API data
const apiData = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" }
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 }
  ]
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterAmount, setFilterAmount] = useState(0);

  useEffect(() => {
    const customersWithTransactions = apiData.customers.map(customer => ({
      ...customer,
      transactions: apiData.transactions.filter(t => t.customer_id === customer.id)
    }));

    const filteredCustomers = customersWithTransactions.filter(customer =>
      customer.name.toLowerCase().includes(filterText.toLowerCase()) &&
      customer.transactions.some(transaction => transaction.amount >= filterAmount)
    );
    setCustomers(filteredCustomers);
  }, [filterText, filterAmount]);

  const handleCustomerSelect = (customer) => {
    console.log("Selected Customer:", customer);
    setSelectedCustomer(customer);
  };

  const TransactionChart = () => {
    if (!selectedCustomer || selectedCustomer.transactions.length === 0) {
      return <p>No transactions available for this customer.</p>;
    }

    const chartData = {
      labels: selectedCustomer.transactions.map(t => t.date),
      
      datasets: [
        {
          label: 'Total Transaction Amount',
          data: selectedCustomer.transactions.map(t => t.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 199, 1)',
          borderWidth: 1,
          
        },
      ],
    };

    console.log('Chart Data:', chartData);

    return (
      <div className='chart container '>
        <h2 className='mb-4 mt-4 text-center bg-dark text-danger p-2 '>{selectedCustomer.name}'s Transactions</h2>
        <div>
        <Bar data={chartData} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className='text-center mb-5'>Customer Transaction App</h1>
      <div className='  d-flex justify-content-center'>
        <label className='mt-2 Search' htmlFor="Search ">Search by name: </label>
      <input
        className='ms-2 me-5 bord py-2 px-2'
        type="text"
        placeholder="Filter by customer name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
         name="Search"
          id="Search"
      />
      <label className='me-2 mt-2 Search' htmlFor="amount">Search by amount: </label>
      <input
      className='bord py-2 px-2 '
        type="text"
        placeholder="Filter by transaction amount"
        value={filterAmount}
        onChange={(e) => setFilterAmount(parseFloat(e.target.value) || 0)}
        name="amount"
        id="amount"
      />
      </div>
      <h3 className='mt-4 mb-4 link-danger text-center'>  Click on customer to view the chart </h3>
      <table className="table table-striped-columns text-center  container ">
        <thead>
          <tr>
            <th scope="col" className='text-danger bg-dark'>ID</th>
            <th scope="col" className='text-danger bg-dark'>Customer Name</th>
            <th scope="col" className='text-danger bg-dark'>Transaction Amount</th>
            <th scope="col" className='text-danger bg-dark'>Transaction Date</th>
          </tr>
        </thead>
        <tbody className='bg-danger'>
          {customers.map((customer) =>
            customer.transactions.map((transaction) => (
              <tr key={transaction.id} onClick={() => handleCustomerSelect(customer)}>
                <th scope="row">{transaction.id}</th>
                <td className='pointer'>{customer.name}</td>
                <td className='pointer'>{transaction.amount.toFixed(2)}</td>
                <td className='pointer'>{transaction.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedCustomer && <TransactionChart />}
    </div>
  );
};

export default App;
