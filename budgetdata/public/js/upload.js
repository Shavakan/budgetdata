document.addEventListener('DOMContentLoaded', function() {
  var inputElement = document.getElementById("fileInput");
  inputElement.addEventListener("change", handleFiles, false);

  var dropElement = document.getElementById("dropInput");
  dropElement.addEventListener("dragenter", dragenter, false);
  dropElement.addEventListener("dragover", dragover, false);
  dropElement.addEventListener("drop", drop, false);

  function handleFiles() {
    var fileList = this.files[0];
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;
    handleFiles(files);
  }
});
