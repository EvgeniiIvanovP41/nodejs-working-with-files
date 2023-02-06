let getFiles = function (folder) {
  fs = require("fs");

  let filesFolder = [];

  fs.readdirSync(folder).forEach((file) => {
    filesFolder.push(file);
  });

  return filesFolder;
};

module.exports.getFiles = getFiles;
