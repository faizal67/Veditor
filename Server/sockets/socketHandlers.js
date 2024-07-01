const QuillDelta = require('quill-delta');
const Document = require('../models/documentModel');

// const documents = {};

const handleSocketConnection = (socket, io) => {
  console.log('a user connected');

  socket.on('requestDocument', async (documentId) => {
    try {
      let document = await Document.findOne({ documentId });

      if (document) {
        socket.join(documentId);
        socket.emit('document', document.content);
      } else {
        socket.emit('error', 'Document not found!');
      }
    } catch (error) {
      console.error('Error requesting document:', error);
      socket.emit('error', 'An error occurred while requesting the document');
    }
  });
  // else {
  //   const newDocument = new QuillDelta();
  //   documents[documentId] = newDocument;
  //   socket.join(documentId);
  //   socket.emit('document', newDocument);
  // }

  socket.on('newDocument', async (documentId, delta) => {
    try {
      const newDocument = new QuillDelta(delta);
      const document = new Document({
        documentId,
        content: newDocument
      });

      await document.save();
      socket.join(documentId);
      socket.emit('document', newDocument);
    } catch (error) {
      console.error('Error creating new document:', error);
      socket.emit('error', 'An error occurred while creating the document');
    }
  });

  socket.on('change', (documentId, delta) => {
    // if (documents[documentId]) {
    //   const deltaObj = new QuillDelta(delta);
    //   documents[documentId] = documents[documentId].compose(deltaObj);
      socket.to(documentId).emit('change', delta);
    // }
  });

  socket.on('save', async (documentId, delta) => {
    try {
      await Document.findOneAndUpdate(
        { documentId },
        { content: delta },
        { new: true, upsert: true }
      );
      socket.emit('saveSuccess');
    } catch (error) {
      console.error('Error in saving document:', error);
      socket.emit('error', 'Something went wrong in saving document');
    }
  });


  // socket.on('change', async (documentId, delta) => {
  //   try {
  //     const deltaObj = new QuillDelta(delta);
  //     let document = await Document.findOne({ documentId });

  //     if (document) {
  //       document.content = new QuillDelta(document.content).compose(deltaObj);
  //       await document.save();
  //       socket.to(documentId).emit('change', delta);
  //     } else {
  //       socket.emit('error', 'Document not found!');
  //     }
  //   } catch (error) {
  //     console.error('Error updating document:', error);
  //     socket.emit('error', 'An error occurred while updating the document');
  //   }
  // });

  // socket.on('saveDocument', (documentId) => {
  //   const documentContent = documents[documentId];
  //   if (documentContent) {
  //     fs.writeFileSync(path.join(__dirname, `${documentId}.json`), JSON.stringify(documentContent));
  //   }
  // });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

module.exports = { handleSocketConnection };
