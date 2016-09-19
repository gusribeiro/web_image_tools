if (!inputFolder) {
    #target "photoshop"
    var inputFolder = Folder.selectDialog();
}

var outputFolder = new Folder(inputFolder + "/otimizadas");

if (!outputFolder.exists) outputFolder.create();

var fileList = inputFolder.getFiles("*.jpg");

for (var i = 0; i < fileList.length; i++) {
    open(fileList[i]);

    var doc = app.activeDocument;

    var fileName = fileList [i].name.slice(0, -4);
    var newFile = new File(decodeURI(outputFolder) + "/" + fileName + ".jpg");

    doc.resizeImage(null, null, 72);

    exportOptions = new ExportOptionsSaveForWeb();
    exportOptions.format = SaveDocumentType.JPEG;
    exportOptions.quality = 51;
    exportOptions.optimized = true;

    doc.exportDocument (newFile, ExportType.SAVEFORWEB, exportOptions);
    doc.close (SaveOptions.DONOTSAVECHANGES);
}