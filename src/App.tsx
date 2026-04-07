import './App.scss'
import { useState, useEffect } from "react";
import { ChooseFolderButton } from './components/ChooseFolderButton';
import { StartExtractionButton } from './components/StartExtractionButton';

function App() {

  const [selectedKoboFolderPath, setSelectedKoboFolderPath] =
    useState<string | undefined>(undefined);

  async function tryFindKoboReaderDriveAsync(): Promise<void> {
    const koboReaderDrive = await window.ipcApp.tryFindKoboReaderDriveAsync();

    if (!koboReaderDrive) return;

    setSelectedKoboFolderPath(koboReaderDrive);
  }

  useEffect(() => {
    tryFindKoboReaderDriveAsync();
  }, []);

  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-2">Extract Kobo Bookmarks</h1>
        </center>

        <h2 className="title is-3">Select your Kobo Device drive.</h2>
        <ChooseFolderButton 
          setSelectedFolder={setSelectedKoboFolderPath}
          selectedFolder={selectedKoboFolderPath} />
        {
          selectedKoboFolderPath && <>
              <pre>
                  Selected drive:&nbsp;
                  { selectedKoboFolderPath }
              </pre>
          </>
        }

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
