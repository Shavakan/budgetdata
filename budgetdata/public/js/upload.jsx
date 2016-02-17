var FileInputForm = React.createClass({
  change: function(e) {
    this.handleFiles(e.target.files[0]);
  },
  dragEnter: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },
  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },
  drop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    this.handleFiles(e.dataTransfer.files[0]);
  },
  handleFiles: function(f) {
    this.setState({
      fileName: f.name
    });
  },
  getInitialState: function() {
    return {
      fileName: '여기에 파일을 드래그&드랍하세요.',
    };
  },
  render: function() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="fileInput">파일: </label>
          <p className="help-block">모든 작업이 완료되기 전까지 파일은 절대로 서버로 업로드되지 않습니다.</p>
          <input type="file" id="fileInput" 
            onChange={this.change} />
          <div id="dropInput" 
            onDragEnter={this.dragEnter}
            onDragOver={this.dragOver}
            onDrop={this.drop}>
            <p className="help-block">{this.state.fileName}</p>
          </div>
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  <FileInputForm />,
  document.getElementsByClassName("container")[0]
);

