import React, { useRef, useState, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import Editor from './components/Editor';
import Home from './Home';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [content, setContent] = useState();
  const [view, setView] = useState('home'); // State to manage the current view
  const quillRef = useRef(null);

  const handleFileContent = (fileContent) => {
    setView('editor'); // Switch to the editor view when a file is uploaded
    setContent(fileContent);
    if (quillRef.current) {
      quillRef.current.setContents(fileContent);
    }
    socket.emit('newDocument', fileContent); // Send the new document content to the server
  };

  const handleTextChange = (delta, oldDelta, source) => {
    if (quillRef.current && source === 'user') {
      const newDelta = quillRef.current.getContents();
      setContent(newDelta);
      socket.emit('change', newDelta);
    }
  };

  const handleBack = () => {
    setView('home'); // Switch back to the home view
  };

  console.log('current content is:', content)

  useEffect(() => {
    // Fetch initial document content from the server if needed
    socket.emit('requestDocument');
    const handleInitialDocument = (documentContent) => {
      if (documentContent !== '') {
        setView('editor');
        setContent(documentContent);
        if (quillRef.current) {
          quillRef.current.setContents(documentContent);
        }
      }

    };
    socket.on('document', handleInitialDocument)
    // handleFileContent(documentContent)
    // console.log('server send data:', documentContent)
    // console.log('ref',quillRef.current)
    // if (quillRef.current) {
    //   quillRef.current.setContents(documentContent);
    //   setContent(documentContent);
    //   setView('editor'); // Switch to editor view if there's an existing document
    // }
    // });

    socket.on('change', (delta) => {
      if (quillRef.current) {
        quillRef.current.updateContents(delta);
      }
    });

    return () => {
      socket.off('document', handleInitialDocument);
      socket.off('change');
    };
  }, []);

  return (
    <>

      {view === 'home' ? (
        <Home handleFileContent={handleFileContent} setView={setView} />
      ) : (
        <div className="bg-sky-50">
          <button onClick={handleBack} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
            Back
          </button>
          <div className="max-w-5xl mx-auto p-4">
            <Editor
              ref={quillRef}
              defaultValue={content}
              onTextChange={handleTextChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
