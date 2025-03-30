import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Date from './Date.tsx';

const CreateInvoice = () => {
    const [date, setDate] = useState({ month: '', day: '', year: '' });
    const navigateToHome = useNavigate();

    const handleSubmit = () => {
        alert(`Date: ${date.month}/${date.day}/${date.year}`);
    }

    const handleBackToHome = () => {
        navigateToHome('/');
    };
    return (
        <div>
            <button onClick={handleBackToHome}>Back to Home</button>
            <Date date={date} setDate={setDate} />
            <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
        </div>
    )
}

export default CreateInvoice;