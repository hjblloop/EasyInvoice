import {useState, useEffect, useRef } from 'react';
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
    const [test, setTest] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const navigateToHome = useNavigate();

    const handleSubmit = () => {
        setInvoiceNumber(`${date.year}${date.month}${date.day}`);
        setServiceDateMessage(`Service period from ${serviceDatePre.month}/${serviceDatePre.day}/${serviceDatePre.year} to ${serviceDatePost.month}/${serviceDatePost.day}/${serviceDatePost.year}`);
        
        generatePDF();
    }

    const generatePDF = () => {
        const doc = new jsPDF();

        //Invoice Title
        doc.setFontSize(18);
        doc.text('Invoice', 50, 10);

        //Invoice Number and Date
        doc.setFontSize(12);
        doc.text('Invoice Number: ' + invoiceNumber, 10, 20);
        doc.text('Date: ' + date.month + '/' + date.day+ '/' + date.year, 10, 30);

        //Bill To and Ship To
        doc.text('Bill To: ', 10, 40);
        doc.text(billTo, 10, 50);
        doc.text('Ship To: ' + shipTo, 50, 40);
        doc.text(shipTo, 50, 50);

        //Service Period
        doc.text('Service Period: ', 10, 80);
        doc.text(serviceDateMessage, 10, 90);

        //Items table
        doc.text('Items: ', 10, 100);
        let y = 110;
        items.forEach((item, index) => {
            doc.text(`Item ${index + 1}: ${item.itemName}`, 10, y);
            doc.text(`Quantity: ${item.quantity}`, 10, y + 10);
            doc.text(`Price: $${item.price}`, 10, y + 20);
            doc.text(`Total: $${item.total}`, 10, y + 30);
            y += 10;
        });

        const pdfData = doc.output('datauristring');
        if (iframeRef.current) {
            iframeRef.current.src = pdfData;
        }
    }

    useEffect(() => {
        generatePDF();
    }, [date, serviceDatePre, serviceDatePost, items, invoiceFrom, billTo, shipTo]);

    const handleBackToHome = () => {
        navigateToHome('/');
    };

    const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTest(e.target.value);
    }
    return (
        <div className="createInvoiceContainer">
            <div className="formContainer">
                <button onClick={handleBackToHome}>Back to Home</button>
                <Date date={date} setDate={setDate} />
                <InvoiceFrom invoiceFrom={invoiceFrom} setInvoiceFrom={setInvoiceFrom} />
                <div className="billToShipTo">
                    <div className="billTo">
                        <label>Bill To:</label>
                        <textarea id="billTo" value={billTo} rows={4} onChange={(e)=> setBillTo(e.target.value)} placeholder="Bill To Information" />
                    </div>
                    <div className="shipTo">
                        <label>Ship To:</label>
                        <textarea id="shipto" value={shipTo} rows={4} onChange={(e)=> setShipTo(e.target.value)} placeholder="Ship To Information" />
                    </div>
                </div>
                <p>Service Period</p>
                <Date date={serviceDatePre} setDate={setServiceDatePre} />
                <Date date={serviceDatePost} setDate={setServiceDatePost} />
                <Items items={items} setItems={setItems}/>
                <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
                <input type="text" onChange={handleTestChange} value={test} placeholder="test place"></input>
                <div title="test title" dangerouslySetInnerHTML={{ __html: test}}>

                </div>
            </div>
            <div className="pdfPreviewContainer">
                <iframe
                    ref={iframeRef}
                    title="PDF Preview"
                    style={{ width: '100%', height: '100%' }}
                ></iframe>
            </div>
        </div>
    )
}

export default CreateInvoice;