import React from 'react';
import Editor from '../Editor';
import { useParams } from 'react-router-dom';

const EditorWrapper = () => {
  const { id } = useParams();
  return <Editor documentId={id} />;
};

export default EditorWrapper;