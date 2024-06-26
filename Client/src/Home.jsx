import FileUpload from "./components/FileUpload"

const Home = ({handleFileContent, setView}) => {
  return (
    <div className="h-screen w-screen bg-[url('')] bg-no-repeat bg-cover ">
      <div className="h-screen w-screen bg-sky-50 bg-opacity-90">
      <h1 className="pt-20 text-6xl  text-blue-600 text-center first-letter:text-blue-900">Veditor</h1>
      <div className="flex flex-col justify-center  items-center">
        <div className="text-2xl p-2  mt-12 text-blue-600 transition-all">Upload Your Document</div>
        <div className="flex flex-col">
        <FileUpload onFileContent={handleFileContent} setView={setView}/>
        <span style={{fontSize:'0.7rem', paddingLeft:'0.5rem'}}>Only support Docx, Doc, pdf file</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
