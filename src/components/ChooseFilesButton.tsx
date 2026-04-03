import { useState } from "react";

export function ChooseFilesButton() {

    const [message, setMessage] = useState('Not clicked');

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        console.log('clickity');

        window.ipcApp.selectKoboReaderFile();

        setMessage('clicked');
    }

    return <>
        <button 
            className="button"
            onClick={ handleClick }
        >
            Click me! ({message})
        </button>
    </>
}