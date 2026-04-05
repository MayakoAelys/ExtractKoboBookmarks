import './App.scss'
import { useState } from "react";
import { ChooseKoboReaderFileButton } from './components/ChooseKoboReaderFileButton';
import { ChooseFolderButton } from './components/ChooseFolderButton';
import { StartExtractionButton } from './components/StartExtractionButton';

function App() {

  const [selectedKoboReaderFilePath, setSelectedKoboReaderFilePath] = 
    useState<string | undefined>(undefined);

  const [selectedKoboFolderPath, setSelectedKoboFolderPath] =
    useState<string | undefined>(undefined);

  function setDefaultValues() {
    setSelectedKoboReaderFilePath("C:\\Users\\Liline\\Downloads\\KoboReader.sqlite");
    setSelectedKoboFolderPath("H:\\");
  }

  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-2">Extract Kobo Bookmarks</h1>
          <button 
            onClick={setDefaultValues}
          >
            default values
          </button>
        </center>

        <h2 className="title is-3">Select KoboReader file</h2>
        <p className="subtitle is-6">Select your KoboReader.sqlite file.</p>
        <ChooseKoboReaderFileButton 
          setSelectedFile={setSelectedKoboReaderFilePath} 
          selectedFile={ selectedKoboReaderFilePath} />

        <h2 className="title is-3">Select your Kobo Device</h2>
        <p className="subtitle is-6">Select the root folder of your device.</p>
        <ChooseFolderButton 
          setSelectedFolder={setSelectedKoboFolderPath}
          selectedFolder={selectedKoboFolderPath} />

        {
          selectedKoboFolderPath && selectedKoboReaderFilePath &&
          <>
            <h2 className="title is-3">Ready to extract!</h2>
            <StartExtractionButton 
              koboReaderFilePath={selectedKoboReaderFilePath} 
              koboRootFolderPath={selectedKoboFolderPath} />
          </>
        }
      </section>
    </div>
  )
}

export default App
