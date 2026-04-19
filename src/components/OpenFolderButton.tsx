interface Props {
    folderPath: string;
}

export function OpenFolderButton({ folderPath }: Props) {

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        window.ipcApp.openFolderAsync(folderPath);
    }

    return <>
        <button 
            className={ "button is-primary" }
            onClick={ handleClick }
        >
            Open folder
        </button>
    </>
}