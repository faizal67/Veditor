const QuillDelta = require('quill-delta');

const documents = {};

const handleSocketConnection = (socket, io) => {
  console.log('a user connected');

  socket.on('requestDocument', (documentId) => {
    if (documents[documentId]) {
      socket.join(documentId);
      socket.emit('document', documents[documentId]);
    } else {
      const newDocument = new QuillDelta();
      documents[documentId] = newDocument;
      socket.join(documentId);
      socket.emit('document', newDocument);
    }
  });

  socket.on('newDocument', (documentId, delta ) => {
    // console.log(delta)
    const newDocument = new QuillDelta(delta);
    documents[documentId] = newDocument;
    // io.to(documentId).emit('document', newDocument);
  });

  socket.on('change', (documentId, delta) => {
    if (documents[documentId]) {
      const deltaObj = new QuillDelta(delta);
      documents[documentId] = documents[documentId].compose(deltaObj);
      socket.to(documentId).emit('change', delta);
    }
  });

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
