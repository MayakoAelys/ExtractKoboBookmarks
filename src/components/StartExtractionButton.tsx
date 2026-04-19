import { useState } from "react";

interface Props {
    koboRootFolderPath: string;
    setExtractedFilesFolderPath: (path: string) => void;
}

export function StartExtractionButton({ koboRootFolderPath, setExtractedFilesFolderPath }: Props) {

    const [isExtracting, setIsExtracting] = useState<boolean>(false);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        setIsExtracting(true);

        window.ipcApp
            .startExtractionAsync(koboRootFolderPath)
            .then((extractedFilesFolderPath) => {
                setExtractedFilesFolderPath(extractedFilesFolderPath);
                setIsExtracting(false);
            });
    }

    return <>
        <button 
            className={ "button is-primary" + (isExtracting ? " disabled is-loading" : "") }
            onClick={ handleClick }
        >
            Start extraction
        </button>
    </>
}