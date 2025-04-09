import {useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import InvoiceDate from './Date.tsx';
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
        setServiceDateMessage(`From ${serviceDatePre.month}/${serviceDatePre.day}/${serviceDatePre.year} to ${serviceDatePost.month}/${serviceDatePost.day}/${serviceDatePost.year}`);
        
        saveInvoiceData();
        generatePDF();
    }

    useEffect(() => {
        const today = new Date();
        setDate({
            month: String(today.getMonth() + 1).padStart(2, '0'),
            day: String(today.getDate()).padStart(2, '0'),
            year: String(today.getFullYear()),
        });
        loadInvoiceData();
    }, []);

    function nextInfo(docY: number) {
        return docY + 10;
    }

    function nextLine(docY: number) {
        return docY + 4;
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        let currentDocY = 10;
        const singleLineHeight = 4;

        //Invoice Title
        doc.setFontSize(36);
        doc.text('Invoice', 40, currentDocY);
        currentDocY = nextInfo(currentDocY);

        //Address of Invoice From
        doc.setFontSize(12);
        doc.text(invoiceFrom.name, 10, currentDocY);
        currentDocY = nextLine(currentDocY)
        doc.text(invoiceFrom.address, 10, currentDocY);
        currentDocY = nextLine(currentDocY)
        doc.text(invoiceFrom.address2, 10, currentDocY);
        currentDocY = nextLine(currentDocY)
        doc.text(`${invoiceFrom.city}, ${invoiceFrom.state} ${invoiceFrom.zip}`, 10, currentDocY);
        currentDocY = nextInfo(currentDocY);

        //Invoice Number and Date
        doc.setFontSize(12);
        doc.text('Invoice Number: ' + invoiceNumber, 10, currentDocY);
        currentDocY = nextInfo(currentDocY);
        doc.text('Date: ' + date.month + '/' + date.day+ '/' + date.year, 10, currentDocY);
        currentDocY = nextInfo(currentDocY);

        //Bill To and Ship To
        doc.text('Bill To: ', 10, currentDocY);
        const billToLines = billTo.split('\n');
        let billToY = currentDocY;
        billToLines.forEach((line) => {
            billToY += singleLineHeight;
            doc.text(line, 10, billToY);
        });
        doc.text('Ship To: ', 50, currentDocY);
        const shipToLines = shipTo.split('\n');
        let shipToY = currentDocY;
        shipToLines.forEach((line) => {
            shipToY += singleLineHeight;
            doc.text(line, 50, shipToY);
        });
        //dynamically set next Y position based on longest section
        if (billToLines.length > shipToLines.length) {
            currentDocY = billToY;
        }
        else {
            currentDocY = shipToY;
        }
        currentDocY = nextInfo(currentDocY);

        //Service Period
        doc.text('Service Period: ', 10, currentDocY);
        currentDocY = nextLine(currentDocY);
        doc.text(serviceDateMessage, 10, currentDocY);
        currentDocY = nextInfo(currentDocY);

        //Items table
        currentDocY = nextInfo(currentDocY);
        doc.text(`Item:`, 10, currentDocY);
        doc.text(`Quantity:`, 30, currentDocY);
        doc.text(`Price:`, 50, currentDocY);
        doc.text(`Total:`, 70, currentDocY);
        let y = nextLine(currentDocY);
        items.forEach((item) => {
            doc.text(`${item.itemName}`, 10, y);
            doc.text(`${item.quantity}`, 30, y);
            doc.text(`${item.price}`, 50, y);
            doc.text(`${item.total}`, 70, y);
            y += singleLineHeight;
        });

        const pdfData = doc.output('datauristring');
        if (iframeRef.current) {
            iframeRef.current.src = pdfData;
        }
    }

    useEffect(() => {
        generatePDF();
    }, [date, serviceDatePre, serviceDatePost, items, invoiceFrom, billTo, shipTo]);

    const saveInvoiceData = () => {
        const invoiceData = {
            invoiceFrom,
            billTo,
            shipTo,
        };
        localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    };

    const loadInvoiceData = () => {
        const savedData = localStorage.getItem('invoiceData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setInvoiceFrom(parsedData.invoiceFrom);
            setBillTo(parsedData.billTo);
            setShipTo(parsedData.shipTo);
        }
    };

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
                <InvoiceDate date={date} setDate={setDate} />
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
                <InvoiceDate date={serviceDatePre} setDate={setServiceDatePre} />
                <InvoiceDate date={serviceDatePost} setDate={setServiceDatePost} />
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