import { useState } from "react";

interface Props {
    koboRootFolderPath: string
}

export function StartExtractionButton({ koboRootFolderPath }: Props) {

    const [extractedFilesFolderPath, setExtractedFilesFolderPath] = useState<string>();

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        console.log('StartExtractionButton - IN');
        console.log('StartExtractionButton - koboRootFolderPath:', koboRootFolderPath);

        window.ipcApp
            .startExtractionAsync(koboRootFolderPath)
            .then((extractedFilesFolderPath) => {
                console.log('StartExtractionButton - extractedFilesFolderPath', extractedFilesFolderPath);
                setExtractedFilesFolderPath(extractedFilesFolderPath);
            });
    }

    return <>
        <button 
            className="button is-primary"
            onClick={ handleClick }
        >
            Start extraction
        </button>
        {
            extractedFilesFolderPath && <>
                <pre>
                    Extracted files are here:&nbsp;
                    { extractedFilesFolderPath }
                </pre>
            </>
        }
    </>
}