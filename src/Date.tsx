import React from 'react';

const Date = ( {date, setDate}: { date: { month: string; day: string; year: string}; 
    setDate: (newDate: {month: string; day: string; year: string}) => void }) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setDate({ ...date, [name]: value});
        };

        return (
            <div style={{ display: 'flex', gap: '10px'}}>
                <input
                    type="text"
                    placeholder="Month"
                    name="month"
                    value={date.month}
                    onChange={handleInputChange}
                    maxLength={2}
                    style={{ width: '50px', textAlign: 'center'}}
                />
                <input
                    type="text"
                    placeholder="Day"
                    name="day"
                    value={date.day}
                    onChange={handleInputChange}
                    maxLength={2}
                    style={{ width: '50px', textAlign: 'center'}}
                />
                <input 
                    type="text"
                    placeholder="Year"
                    name="year"
                    value={date.year}
                    onChange={handleInputChange}
                    maxLength={4}
                    style={{ width: '70px', textAlign: 'center'}}
                />
            </div>
        );
};

export default Date;