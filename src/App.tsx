import './App.scss'
import { useState } from "react";
import { ChooseFilesButton } from './components/ChooseFilesButton';

function App() {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleDropFile(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (!(files?.length)) return;

    setSelectedFiles(Array.from(files));

    console.log(selectedFiles);

    alert('Test!');
  }
  
  
  return (
    <div className="container">
      <section>
        <center>
          <h1 className="title is-3">Extract Kobo Bookmarks</h1>
        </center>

        <h1 className="title is-4">Select KoboReader file</h1>
        <div 
          onDrop={ handleDropFile }
          onDragOver={ (e) => e.preventDefault() }
        >
          <p>
            Drop your KoboReader file here! <br />
          ... Or click on the following button
          </p>
          <p>
            <ChooseFilesButton />
          </p>
        </div>

        <pre>Selected files: { JSON.stringify(selectedFiles) }</pre>

      </section>
    </div>
  )
}

export default App
