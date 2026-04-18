import './App.scss'
import { useState } from "react";
import { StartExtractionButton } from './components/StartExtractionButton';
import { ChooseUSBDeviceSelect } from './components/ChooseUSBDeviceSelect';

function App() {

  const [selectedKoboFolderPath, setSelectedKoboFolderPath] =
    useState<string | undefined>(undefined);

  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-2">Extract Kobo Bookmarks</h1>
        </center>

        <h2 className="title is-3">Select your Kobo Device drive.</h2>

        <ChooseUSBDeviceSelect
          setSelectedFolder={setSelectedKoboFolderPath}
          selectedFolder={selectedKoboFolderPath}
        />

        {
          selectedKoboFolderPath &&
          <>
            <h2 className="title is-3">Ready to extract!</h2>
            <StartExtractionButton 
              koboRootFolderPath={selectedKoboFolderPath} />
          </>
        }
      </section>
    </div>
  )
}

export default App
