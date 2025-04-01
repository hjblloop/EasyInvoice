import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Date from './Date.tsx';
import Items from './Items.tsx';

const CreateInvoice = () => {
    const [date, setDate] = useState({ month: '', day: '', year: '' });
    const [serviceDatePre, setServiceDatePre] = useState({ month: '', day: '', year: '' });
    const [serviceDatePost, setServiceDatePost] = useState({ month: '', day: '', year: '' });
    const [serviceDateMessage, setServiceDateMessage] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [items, setItems] = useState([{ itemName: '', quantity: 0, price: 0, total: 0 }]);


    const navigateToHome = useNavigate();

    const handleSubmit = () => {
        setInvoiceNumber(`${date.year}${date.month}${date.day}`);
        setServiceDateMessage(`Service period from ${serviceDatePre.month}/${serviceDatePre.day}/${serviceDatePre.year} to ${serviceDatePost.month}/${serviceDatePost.day}/${serviceDatePost.year}`);
        alert(`Date: ${date.month}/${date.day}/${date.year} and Invoice Number: ${invoiceNumber} and service period from
            ${serviceDateMessage}`);
    }

    const handleBackToHome = () => {
        navigateToHome('/');
    };
    return (
        <div>
            <button onClick={handleBackToHome}>Back to Home</button>
            <Date date={date} setDate={setDate} />
            <p>Service Period</p>
            <Date date={serviceDatePre} setDate={setServiceDatePre} />
            <Date date={serviceDatePost} setDate={setServiceDatePost} />
            <Items items={items} setItems={setItems}/>
            <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
        </div>
    )
}

export default CreateInvoice;