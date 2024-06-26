import React from 'react';
import * as mammoth from 'mammoth';
import Quill from 'quill';


function htmlToDelta(html) {
  const quill = new Quill(document.createElement('div'));
  quill.clipboard.dangerouslyPasteHTML(0, html);
  return quill.getContents();
}
const FileUpload = ({ onFileContent }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;
      const delta = htmlToDelta(htmlContent);
      onFileContent(delta);
    }
  };

  return (
    <div className="my-4">
      <input
        type="file"
        accept=".doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm 
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   file:cursor-pointer
                   hover:file:bg-blue-100
                   cursor-pointer
                   border-2
                   border-blue-500
                   p-2  mt-4 
                   text-1xl 
                   rounded-md 
                   text-blue-600
                   transition-all
                   shadow-xl
                   hover:bg-blue-50 
                   hover:text-blue-700
                   hover:shadow-slate-400"
      />
    </div>
  );
};

export default FileUpload;
