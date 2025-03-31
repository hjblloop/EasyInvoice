import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Date from './Date.tsx';

const CreateInvoice = () => {
    const [date, setDate] = useState({ month: '', day: '', year: '' });
    const [serviceDatePre, setServiceDatePre] = useState({ month: '', day: '', year: '' });
    const [serviceDatePost, setServiceDatePost] = useState({ month: '', day: '', year: '' });
    const [invoiceNumber, setInvoiceNumber] = useState('');

    const navigateToHome = useNavigate();

    const handleSubmit = () => {
        setInvoiceNumber(`${date.year}${date.month}${date.day}`);
        alert(`Date: ${date.month}/${date.day}/${date.year} and Invoice Number: ${invoiceNumber} and service period from
            ${serviceDatePre.month}/${serviceDatePre.day}/${serviceDatePre.year} to 
            ${serviceDatePost.month}/${serviceDatePost.day}/${serviceDatePost.year}`);
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
            <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
        </div>
    )
}

export default CreateInvoice;