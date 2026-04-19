import { useEffect } from "react";

interface Props {
    koboReaderPath: string;
    isAKoboReader: boolean;
    setIsAKoboReader: (isAKoboReader: boolean) => void;
}

export function CheckingDriveComponent({ koboReaderPath, isAKoboReader, setIsAKoboReader }: Props) {

    async function CheckDriveAsync(): Promise<void> {
        console.log('CheckDriveAsync - koboReaderPath:', koboReaderPath);
        setIsAKoboReader(await window.ipcApp.tryDriveIsAKoboReaderAsync(koboReaderPath));
    }

    useEffect(() => {
        console.log('use effect checkingdrivecomponent');
        CheckDriveAsync();
    }, [koboReaderPath])

    if (!koboReaderPath)
        return <></>;

    if (isAKoboReader) {
        return <>
            <div className="notification is-success">The selected drive has been recognized as a valid Kobo Reader.</div>
        </>;
    }
    else {
        return <>
            <div className="notification is-warning">The selected drive has not been recognized as a valid Kobo Reader.</div>
        </>;
    }
}