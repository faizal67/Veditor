import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import socket from './socket';


const Editor = ({ documentId }) => {
  const [content, setContent] = useState();
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  
  useEffect(() => {
    console.log('current content is:', content);
    socket.emit('requestDocument', documentId);

    const handleInitialDocument = (documentContent) => {
      if (documentContent && quillRef.current) {
        quillRef.current.setContents(documentContent);
        setContent(documentContent);
      }
    };

    socket.on('document', handleInitialDocument);

    socket.on('change', (delta) => {
      if (quillRef.current) {
        quillRef.current.updateContents(delta);
        // setContent(quillRef.current.getContents)
      }
    });

    return () => {
      socket.off('document', handleInitialDocument);
      socket.off('change');
    };
  }, ['document']);

  const handleTextChange = (delta, oldDelta, source) => {
    if (quillRef.current && source === 'user') {
      const newDelta = quillRef.current.getContents();
      setContent(newDelta);
      socket.emit('change', documentId, delta);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
    });

    quillRef.current = quill;

    if (content) {
      quill.setContents(content);
    }



    quill.on(Quill.events.TEXT_CHANGE, handleTextChange);

    

    return () => {
      quillRef.current = null;
      container.innerHTML = '';
    };
  }, []);

 

  return <div className='bg-white quill-editor' ref={containerRef}></div>;
};

export default Editor;
