import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Date from './Date.tsx';
import Items from './Items.tsx';
import InvoiceFrom from './InvoiceFrom.tsx';
import './CreateInvoice.css';

const CreateInvoice = () => {
    const [date, setDate] = useState({ month: '', day: '', year: '' });
    const [serviceDatePre, setServiceDatePre] = useState({ month: '', day: '', year: '' });
    const [serviceDatePost, setServiceDatePost] = useState({ month: '', day: '', year: '' });
    const [serviceDateMessage, setServiceDateMessage] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [items, setItems] = useState([{ itemName: '', quantity: 0, price: 0, total: 0 }]);
    const [invoiceFrom, setInvoiceFrom] = useState({ name: '', address: '', address2: '', city: '', state: '', zip: ''});
    const [billTo, setBillTo] = useState('');
    const [shipTo, setShipTo] = useState('');

    const navigateToHome = useNavigate();

    const handleSubmit = () => {
        setInvoiceNumber(`${date.year}${date.month}${date.day}`);
        setServiceDateMessage(`Service period from ${serviceDatePre.month}/${serviceDatePre.day}/${serviceDatePre.year} to ${serviceDatePost.month}/${serviceDatePost.day}/${serviceDatePost.year}`);
        alert(`Date: ${date.month}/${date.day}/${date.year} and Invoice Number: ${invoiceNumber} and service period from
            ${serviceDateMessage}`);
        generatePDF();
    }

    const generatePDF = () => {
        const doc = new jsPDF();

        //Invoice Title
        doc.setFontSize(18);
        doc.text('Invoice', 10, 10);

        //Invoice Number and Date
        doc.setFontSize(12);
        doc.text('Invoice Number: ' + invoiceNumber, 10, 20);
        doc.text('Date: ' + date.month + '/' + date.day+ '/' + date.year, 10, 30);

        //Bill To and Ship To
        doc.text('Bill To: ', 10, 40);
        doc.text(billTo, 10, 50);
        doc.text('Ship To: ' + shipTo, 10, 60);
        doc.text(shipTo, 10, 70);

        //Service Period
        doc.text('Service Period: ', 10, 80);
        doc.text(serviceDateMessage, 10, 90);

        //Items table
        doc.text('Items:', 10, 100);
        let y = 110;
        items.forEach((item, index) => {
            doc.text(`Item ${index + 1}: ${item.itemName}`, 10, y);
            doc.text(`Quantity: ${item.quantity}`, 10, y + 10);
            doc.text(`Price: $${item.price}`, 10, y + 20);
            doc.text(`Total: $${item.total}`, 10, y + 30);
            y += 10;
        });

        const pdfData = doc.output('datauristring');
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        iframe.src = pdfData;
        document.body.appendChild(iframe);
    }

    const handleBackToHome = () => {
        navigateToHome('/');
    };
    return (
        <div className="createInvoiceContainer">
            <button onClick={handleBackToHome}>Back to Home</button>
            <Date date={date} setDate={setDate} />
            <InvoiceFrom invoiceFrom={invoiceFrom} setInvoiceFrom={setInvoiceFrom} />
            <div className="billToShipTo">
                <label>Bill To:</label>
                <textarea id="billTo" value={billTo} rows={4} onChange={(e)=> setBillTo(e.target.value)} placeholder="Bill To Information" />
                <label>Ship To:</label>
                <textarea id="shipto" value={shipTo} rows={4} onChange={(e)=> setShipTo(e.target.value)} placeholder="Ship To Information" />
            </div>
             <p>Service Period</p>
            <Date date={serviceDatePre} setDate={setServiceDatePre} />
            <Date date={serviceDatePost} setDate={setServiceDatePost} />
            <Items items={items} setItems={setItems}/>
            <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
        </div>
    )
}

export default CreateInvoice;