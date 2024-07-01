import { useEffect, useState } from "react"
import FileUpload from "./components/FileUpload"
import img from './assets/editor.png'
import LoginCard from "./components/LoginCard";
import SignUpCard from "./components/SignupCard";

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Delta } from "quill/core";
import socket from "./socket";

import { useDispatch, useSelector } from 'react-redux';
import { resetAuthError, addDocumentToUser, logout } from "./redux/slices/authSlice";
import Button from "./components/Button";



const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginCardVisible, setLoginCardVisible] = useState(false);
  const [isSignUpCardVisible, setSignUpCardVisible] = useState(false);

  const handleOpenLoginCard = () => {
    setLoginCardVisible(true);
    setSignUpCardVisible(false); // Close the sign-up card if open
  };

  const handleCloseLoginCard = () => {
    setLoginCardVisible(false);
    dispatch(resetAuthError());
  };

  const handleOpenSignUpCard = () => {
    setSignUpCardVisible(true);
    setLoginCardVisible(false); // Close the login card if open
  };

  const handleCloseSignUpCard = () => {
    setSignUpCardVisible(false);
    dispatch(resetAuthError());
  };

  const handleOpenDashboard = () => {
    navigate('/dashboard')
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const heading = document.querySelector('.veditor-heading');
    if (heading) {
      heading.classList.add('move-left');
    }
  }, [])


  const handleFileUpload = (fileDelta, fileName) => {
    console.log('getting file Delta:', fileDelta)
    const documentId = uuidv4();
    // const Document = {
    //   documentId: documentId,
    //   delta: fileDelta,
    //   documentName: fileName
    // }
    // console.log('sending data:', Document)
    socket.emit('newDocument', documentId, fileDelta); // Send the new document content to the server
    dispatch(addDocumentToUser({ docId: documentId, fileName }))
    navigate(`/editor/${documentId}`); //navigate the ui to editor window
  };


  const createNewDocument = () => {
    const documentId = uuidv4();
    const delta = new Delta()
    // const newDocument = {
    //   documentId: documentId,
    //   delta: delta
    // }
    const fileName = 'Untitled Doc'
    socket.emit('newDocument', documentId, delta);
    dispatch(addDocumentToUser({ docId: documentId, fileName }))
    navigate(`/editor/${documentId}`);
  };





  return (
    <div className="h-screen  bg-[url('')] bg-no-repeat bg-cover ">
      <div className="h-screen  bg-sky-50 bg-opacity-90 flex flex-col items-center">
        {isLoginCardVisible && <LoginCard onClose={handleCloseLoginCard} />}
        {isSignUpCardVisible && <SignUpCard onClose={handleCloseSignUpCard} openLogin={handleOpenLoginCard} />}
        {
          user ?
            <div>
              <div className="
                  fixed top-10 right-12
                  mr-[90px]
                  p-2   
                  text-sm
                  font-semibold
                  rounded-md 
                  cursor-pointer
                  text-blue-700
                  transition-all
                  bg-blue-50
                  hover:text-blue-700
                  hover:bg-blue-100">
                {user.username}
              </div>
              <Button
                text={'Logout'}
                className='fixed top-10 right-12 border-2 border-blue-700 hover:shadow-slate-400 shadow-lg'
                onClick={handleLogout}
              />
              <Button
                text={'Dashboard'}
                onClick={handleOpenDashboard}
                className="fixed top-10 left-12"
              />
            </div>
            :
            <div>
              <Button
                text={'Sign in'}
                onClick={handleOpenLoginCard}
                className="fixed top-10 right-12 mr-[90px]"
              />
              <Button
                text={'Sign up'}
                onClick={handleOpenSignUpCard}
                className="fixed top-10 right-12 border-2 border-blue-700 hover:shadow-slate-400 shadow-lg"
              />

            </div>
        }
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
