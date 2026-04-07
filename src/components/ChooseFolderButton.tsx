import { useState } from "react";

interface Props {
    setSelectedFolder: (file: string | undefined) => void;
    selectedFolder: string | undefined;
}

export function ChooseFolderButton({ selectedFolder, setSelectedFolder }: Props) {

    const [folderSelected, setFolderSelected] = useState<boolean>(false);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        window.ipcApp.selectFolderAsync().then((selectedFolderPath) => {
            setSelectedFolder(selectedFolderPath);
            setFolderSelected(true);
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
            folderSelected && !selectedFolder && 
            <>
                <div className="notification is-danger">
                    <button className="delete"></button>
                    <p>Please select your Kobo Reader root folder.</p>
                </div>
            </>
        }
        
    </>
}