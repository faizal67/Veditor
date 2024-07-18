import React ,{useState, useEffect} from 'react';
import Editor from '../Editor';
import { useParams,useNavigate } from 'react-router-dom';
import Button from './Button';
import socket from '../socket';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const EditorWrapper = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSaveSuccess = () => {
      setLoading(false);
    };

    socket.on('saveSuccess', handleSaveSuccess);

    return () => {
      socket.off('saveSuccess', handleSaveSuccess);
    };
  }, []);

  
  const backHandler = () => {
    navigate('/')
  }
  const content = useSelector((state) => state.document.content);
  const saveHandler = () => {
    setLoading(true)
    console.log('saved doc:', content)

    socket.emit('save',id, content,() => {
    })
  }
  const { id } = useParams();
  return (
    <div className=" ">
      <div className='text-center'>
      <Button text={'Back'} onClick={backHandler} className='my-5 mx-8' />

      <Button text={''} onClick={saveHandler} >{loading ? <LoadingSpinner/> : 'Save'}</Button>
      </div>
      
      <div className="w-[80%] mx-auto rounded-xl"> 
        <Editor documentId={id} />
      </div>
    </div>
  );
};

export default EditorWrapper;