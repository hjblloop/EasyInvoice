import React from 'react';

const InvoiceFrom = ({
    invoiceFrom,
    setInvoiceFrom
}: {
    invoiceFrom: { name: string; address: string; address2: string; city: string; state: string; zip: string };
    setInvoiceFrom: (newInvoiceFrom: { name: string; address: string; address2: string; city: string; state: string; zip: string }) => void
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoiceFrom({ ...invoiceFrom, [name]: value });
    };

    return (
        <div>
            <h3>Invoice From</h3>
            <label>Name </label>
            <input
                type="text"
                name="name"
                value={invoiceFrom.name}
                onChange={handleChange}
                placeholder="Name of the company"
            ></input>
            <br></br>
            <label>Address </label>
            <input
                type="text"
                name="address"
                value={invoiceFrom.address}
                onChange={handleChange}
                placeholder="Address"
            ></input>
            <br></br>
            <label>Address 2 </label>
            <input
                type="text"
                name="address2"
                value={invoiceFrom.address2}
                onChange={handleChange}
                placeholder="e.g. Suite 100, Unit 200"
            ></input>
            <br></br>
            <label>City </label>
            <input
                type="text"
                name="city"
                value={invoiceFrom.city}
                onChange={handleChange}
                placeholder="City"
            ></input>  
            <br></br>
            <label>State </label>
            <input  
                type="text"
                name="state"
                value={invoiceFrom.state}
                onChange={handleChange}
                placeholder="State"
            ></input>
            <br></br>
            <label>Zip Code </label>
            <input
                type="text"
                name="zip"
                value={invoiceFrom.zip}
                onChange={handleChange}
                placeholder="Zip Code"
            ></input>
        </div>
    )
}

export default InvoiceFrom;