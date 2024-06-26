import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  // const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    // onSelectionChangeRef.current = onSelectionChange;
  });

  // useEffect(() => {
  //   const quillInstance = ref.current;
  //   if (quillInstance) {
  //     quillInstance.enable(!readOnly);
  //   }
  // }, [readOnly, ref]);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula'],
        
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        
          // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
        
          ['clean']                                         // remove formatting button
        ],
      },
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
      // console.log('default value reseived:',quill.getContents)
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      if (onTextChangeRef.current) {
        onTextChangeRef.current(...args);
      }
    });

    // quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
    //   if (onSelectionChangeRef.current) {
    //     onSelectionChangeRef.current(...args);
    //   }
    // });

    return () => {
      ref.current = null;
      container.innerHTML = '';
    };
  }, [ref]);

  return <div className='bg-white quill-editor' ref={containerRef}></div>;
});

// Editor.displayName = 'Editor';

export default Editor;
