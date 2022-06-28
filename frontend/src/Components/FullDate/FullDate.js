import React, { useState, useEffect } from 'react';

function FullDate() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        let iterval = setInterval(() => setDateState(new Date()), 30000);
        return () => clearInterval(iterval);
    }, []);
    return (
        <p>
            {dateState.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })}
        </p>
    );
}

export default FullDate;