import React, {useState} from 'react';

function Dummy() {
    const [response, setResponse] = useState('');

    const callBackend = async () => {
        const backendResponse = await fetch(`${process.env.REACT_APP_MIMICA_BACKEND_URL}/dummy`);

        if (backendResponse.ok) {
            const jsonResponse = await backendResponse.json();
            setResponse(`${jsonResponse.name}, ${jsonResponse.age}`);
        }
    };

    return (
        <div>
            <button onClick={callBackend}>Call the backend</button>
            <div>
                <label htmlFor="response">Response: </label>
                <span id="response">{response}</span>
            </div>
        </div>
    );
}

export default Dummy;