import './App.scss'
import { useState } from "react";
import { ChooseKoboReaderFileButton } from './components/ChooseKoboReaderFileButton';

function App() {

  const [selectedKoboReaderFilePath, setSelectedKoboReaderFilePath] = 
    useState<string | undefined>(undefined);

  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-3">Extract Kobo Bookmarks</h1>
        </center>

        <h1 className="title is-4">Select KoboReader file</h1>
        <ChooseKoboReaderFileButton setSelectedFile={setSelectedKoboReaderFilePath} selectedFile={ selectedKoboReaderFilePath} />

      </section>
    </div>
  )
}

export default App
