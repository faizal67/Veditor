import { useEffect } from "react"
import FileUpload from "./components/FileUpload"
import img from './assets/editor.png'


const Home = ({ handleFileContent, setView }) => {

  useEffect(() => {
    const heading = document.querySelector('.veditor-heading');
    if (heading) {
      heading.classList.add('move-left');
    }
  }, [])
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
            <div className="flex flex-col">
              <FileUpload onFileContent={handleFileContent} setView={setView} />
              <span style={{ fontSize: '0.7rem', paddingLeft: '0.5rem' }}>*Only support Docx, Doc, pdf file</span>
            </div>
          </div>

          <div className="p-5 bg-black border-4 border-gray-500 rounded-lg border-radius">
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
              <img src={img} className=" w-full pt-8" alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
