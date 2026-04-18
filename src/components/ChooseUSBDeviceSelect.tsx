import { Drive } from "drivelist";
import { useEffect, useState } from "react";

interface Props {
    setSelectedFolder: (file: string | undefined) => void;
    selectedFolder: string | undefined;
}

interface DriveSelect {
    path: string;
    description: string;
    size: string | undefined;
}

export function ChooseUSBDeviceSelect({ selectedFolder, setSelectedFolder }: Props) {

    const [allUsbDrives, setAllUsbDrives] = useState<DriveSelect[]>([]);

    function getReadableSize(size: number | null): string | undefined {
        if (!size) return undefined;

        const sizeTypes: string[] = ["B", "KB", "MB", "GB", "TB"];

        for (let i = 0; i < sizeTypes.length; i++) {
            if ((size / 1024) < 1) return `${size.toFixed(2)} ${sizeTypes[i]}`;

            size = size / 1024;
        }

        return `${size.toFixed(2)} ${sizeTypes[sizeTypes.length - 1]}`;
    }

    async function tryFindKoboReaderDriveAsync(): Promise<void> {
        const koboReaderDrive: string | undefined = 
            await window.ipcApp.tryFindKoboReaderDriveAsync();

        if (!koboReaderDrive) return;

        setSelectedFolder(koboReaderDrive);
    }

    async function getUsbDrivesAsync(): Promise<void> {
        const ipcAllUsbDrives: Drive[] = await window.ipcApp.getDrivesAsync("USB");
        const usbDrives: DriveSelect[] = [];

        for (const ipcUsbDrive of ipcAllUsbDrives) {
            const devicePath: string | undefined = ipcUsbDrive?.mountpoints[0]?.path;

            if (!devicePath) continue;

            const newUsbDrive: DriveSelect = {
                path: devicePath,
                description: ipcUsbDrive.description,
                size: getReadableSize(ipcUsbDrive.size)
            }

            usbDrives.push(newUsbDrive);
        }

        setAllUsbDrives(usbDrives);

        await tryFindKoboReaderDriveAsync();
    }

    function onChangeDrive(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();

        console.log('onChangeDrive, event:', event);

        setSelectedFolder(event.target.value);
    }

    useEffect(() => {
        getUsbDrivesAsync();
    }, []);

    return <>
        <div className="select">
            <select onChange={onChangeDrive} value={ selectedFolder || "" }>
                <option key="drive-empty" value="">Select an USB drive</option>
                {
                    allUsbDrives.map((usbDrive) => (
                        <option key={`drive-${usbDrive.path}`} value={usbDrive.path}>
                            {usbDrive.path} ({usbDrive.size}) | {usbDrive.description}
                        </option>
                    ))
                }
            </select>
        </div>
    </>
}