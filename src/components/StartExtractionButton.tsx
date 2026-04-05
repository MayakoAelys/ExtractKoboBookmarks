// import { useState } from "react";

interface Props {
    koboReaderFilePath: string,
    koboRootFolderPath: string
}

export function StartExtractionButton({ koboReaderFilePath, koboRootFolderPath }: Props) {

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        console.log('StartExtractionButton - IN');
        console.log('StartExtractionButton - koboReaderFilePath:', koboReaderFilePath);
        console.log('StartExtractionButton - koboRootFolderPath:', koboRootFolderPath);

        window.ipcApp
            .startExtractionAsync(koboReaderFilePath, koboRootFolderPath)
            .then(() => {
                console.log('StartExtractionButton - OUT');
            });

        // window.ipcApp.selectFolderAsync().then((selectedFolderPath) => {
        //     setSelectedFolder(selectedFolderPath);
        //     setFolderSelected(true);
        // });
    }

    return <>
        <button 
            className="button is-primary"
            onClick={ handleClick }
        >
            Start extraction
        </button>
    </>
}