import { useEffect } from "react"
import FileUpload from "./components/FileUpload"
import img from './assets/editor.png'

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Delta } from "quill/core";
import socket from "./socket";



const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const heading = document.querySelector('.veditor-heading');
    if (heading) {
      heading.classList.add('move-left');
    }
  }, [])

  const handleFileUpload = (fileDelta) => {
    console.log('getting file Delta:',fileDelta)
    const documentId = uuidv4();
    const Document = {
      documentId:documentId,
      delta : fileDelta
    }
    console.log('sending data:',Document)
    socket.emit('newDocument',documentId, Document); // Send the new document content to the server
    navigate(`/editor/${documentId}`); //navigate the ui to editor window
  };


  const createNewDocument = () => {
    const documentId = uuidv4();
    const delta = new Delta()
    const newDocument = {
      documentId:documentId,
      delta : delta
    }
    socket.emit('newDocument',documentId, newDocument);
    navigate(`/editor/${documentId}`);
  };


  return (
    <div className="h-screen  bg-[url('')] bg-no-repeat bg-cover ">
      <div className="h-screen  bg-sky-50 bg-opacity-90 flex flex-col items-center">
        <div className="container">
          <div className="text-center flex flex-row  justify-center">
            <h1 className="pt-20 text-6xl text-blue-900">V</h1>
            <h1 className="pt-20 text-6xl  text-blue-600  veditor-heading">editor</h1>
          </div>
          <div className="flex flex-col justify-center  items-center">
            <div className="text-2xl p-2  mt-12 text-blue-600 transition-all">Upload Your Document</div>
            <button onClick={createNewDocument}>Create New Document</button>
            <div className="flex flex-col">
              <FileUpload handleFileUpload={handleFileUpload} />
              <span style={{ fontSize: '0.7rem', paddingLeft: '0.5rem' }}>*Only support Docx, Doc, pdf file</span>
            </div>
          </div>

          <div className="p-5 bg-black border-4 border-gray-500 rounded-lg border-radius mt-8">
            <div className="bg-white rounded-md h-96 border-radius-inner ">
              <div className="camera-container">
                <div className="camera">
                  <div className="dot"></div>
                </div>
                <div className="camera active">
                  <div className="dot"></div>
                </div>
                <div className="camera">
                  <div className="dot"></div>
                </div>
              </div>
              <img src={img} className=" w-full pt-4 " alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
