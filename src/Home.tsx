import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleCreateInvoice = () => {
        navigate('/create-invoice');
    }

    return (
        <>
          <head>
            <title>Easy Invoice</title>
          </head>
            <body>
           <h1>Make your invoices easier</h1>
            <div>
            <p>Easy Invoice is a simple tool to create and manage invoices.</p>
            <p>It helps you to generate invoices quickly and easily.</p>
            <p>Just fill in the details, and your invoice is ready to go!</p>
            <button onClick={handleCreateInvoice}>Create Invoice</button>
          </div>
        </body>
        </>
      )
}

export default Home;