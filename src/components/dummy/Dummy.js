import React, { useState } from 'react';

function Dummy() {
    const [response, setResponse] = useState('');

    const callBackend = async () => {
        const backendResponse = await fetch(process.env.REACT_APP_MIMICA_BACKEND_URL);

        if (backendResponse.ok) {
            const responseText = await backendResponse.text();
            setResponse(responseText);
        }
    };

    return (
        <div>
            <button onClick={callBackend}>Call the backend</button>
            <div>
                <label htmlFor="response">Response: </label>
                <span id="response">{response}{process.env.REACT_APP_MIMICA_BACKEND_URL}</span>
            </div>
        </div>
    );
}

export default Dummy;