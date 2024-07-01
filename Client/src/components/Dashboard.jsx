import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const openEditor = (docId) => {
    navigate(`/editor/${docId}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='bg-sky-50 h-screen'>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-2 text-blue-900 mt-5">Dashboard</h1>

        <Button
          text={'Back'}
          onClick={handleBack}
          className="fixed top-10 right-12 border-2 border-blue-700 mr-[50px] hover:shadow-slate-400 shadow-lg"
        />
        {user && <p className="mb-6 text-2xl text-blue-600">Welcome, {user.username}</p>}

        {user && user.docs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
            {user.docs.map((doc, index) => (
              <div key={index} className='cursor-pointer m-4' onClick={() => openEditor(doc.docId)}>
                <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-100 cursor-pointer hover:shadow-lg transition-shadow h-40">
                  <h2 className="text-xl font-medium mb-2 text-gray-500">Document {index + 1}</h2>
                  <div className="bg-gray-200 h-2 w-full rounded mb-1"></div>
                  <div className="bg-gray-200 h-2 w-full rounded mb-1"></div>
                  <div className="bg-gray-200 h-2 w-full rounded mb-1"></div>
                  <div className="bg-gray-200 h-2 w-3/4 rounded mb-1"></div>
                </div>
                <p className="text-gray-600 font-semibold mt-2 text-center">{doc.fileName}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-400 text-5xl mt-6">No documents found.</p>
            <p className="text-gray-400 text-5xl mt-6">Start by uploading or creating a new document :)</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Dashboard;
