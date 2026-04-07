import { useState } from "react";

interface Props {
    setSelectedFile: (file: string | undefined) => void;
    selectedFile: string | undefined;
}

export function ChooseKoboReaderFileButton({ setSelectedFile, selectedFile }: Props) {

    const [selectedFileIsValid, setSelectedFileIsValid] = useState<boolean | undefined>(undefined);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        window.ipcApp.selectKoboReaderFileAsync().then((selectedFilePath) => {
            setSelectedFile(selectedFilePath);

            if (selectedFilePath) {
                const fileNamePathSplit = selectedFilePath!.split('\\');
                const fileName = fileNamePathSplit[fileNamePathSplit.length - 1];

                setSelectedFileIsValid(fileName === 'KoboReader.sqlite');
            }
            else
                setSelectedFileIsValid(undefined);
        });
    }

    return <>
        <button 
            className="button"
            onClick={ handleClick }
        >
            Click me!
        </button>
        { 
            selectedFile && <pre>Selected File button: { JSON.stringify(selectedFile) }</pre>
        }
        {
            selectedFileIsValid === false && 
            <>
                <div className="notification is-danger">
                    <button className="delete"></button>
                    <p>Please select your <strong>KoboReader.sqlite</strong> file.</p>
                </div>
            </>
        }
        
    </>
}