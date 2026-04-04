import { useState } from "react";

// interface Props {
//     selectedFile: string;
// }

export function ChooseFilesButton({ setSelectedFile }) {

    const [message, setMessage] = useState('Not clicked');

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        console.log('handleClick - IN');

        window.ipcApp.selectKoboReaderFileAsync().then((selectedFile) => {
            console.log('handleClick - selectedFile =', selectedFile);

            setMessage('clicked');
            setSelectedFile(selectedFile);

        });
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