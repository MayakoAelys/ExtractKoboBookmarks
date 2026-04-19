import './App.scss'
import { useState } from "react";
import { StartExtractionButton } from './components/StartExtractionButton';
import { ChooseUSBDeviceSelect } from './components/ChooseUSBDeviceSelect';
import { CheckingDriveComponent } from './components/CheckingDriveComponent';
import { OpenFolderButton } from './components/OpenFolderButton';

function App() {

  const [selectedKoboFolderPath, setSelectedKoboFolderPath] =
    useState<string | undefined>(undefined);

  const [isAKoboReader, setIsAKoboReader] = useState<boolean>(false);

  const [extractedFolderPath, setExtractedFolderPath] = 
    useState<string | undefined>(undefined);

  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-1">Extract Kobo Bookmarks</h1>
        </center>

        <h2 className="title is-3">1. Select your Kobo Device drive</h2>
        <div className="subtitle is-6">It should be automatically selected if the device is already connected.</div>

        <ChooseUSBDeviceSelect
          setSelectedFolder={setSelectedKoboFolderPath}
          selectedFolder={selectedKoboFolderPath}
        />

        {
          selectedKoboFolderPath && <>
            <h2 className="title is-3">2. Checking the drive</h2>

            <CheckingDriveComponent 
              isAKoboReader={isAKoboReader}
              setIsAKoboReader={setIsAKoboReader}
              koboReaderPath={selectedKoboFolderPath} />
          </>
        }

        {
          selectedKoboFolderPath && isAKoboReader &&
          <>
            <h2 className="title is-3">3. Ready to extract</h2>
            <div className="subtitle is-6">The destination folder will be opened automatically.</div>

            <StartExtractionButton 
              koboRootFolderPath={selectedKoboFolderPath}
              setExtractedFilesFolderPath={setExtractedFolderPath} />
          </>
        }

        {
          selectedKoboFolderPath && isAKoboReader && extractedFolderPath && <>
            <h2 className="title is-3">4. Extracted successfully</h2>
            <p>Files have been successfully extracted on the following path: <code>{extractedFolderPath}</code></p>
            <br />
            <OpenFolderButton folderPath={extractedFolderPath} />
          </>
        }
      </section>
    </div>
  )
}

export default App
