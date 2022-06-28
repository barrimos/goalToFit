import React, { useState, useEffect } from 'react';

function Time() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);
    return (
        <p>
            {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
        </p>
    );
}

export default Time;