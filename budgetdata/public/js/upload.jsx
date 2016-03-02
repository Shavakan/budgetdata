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
    this.handleFiles(e.dataTransfer.files[0]);
  },
  handleFiles: function(f) {
    this.setState({
      fileName: f.name
    });
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {type: 'binary'});
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var json = XLSX.utils.sheet_to_json(worksheet);
      this.props.setData(json);
    }.bind(this);;
    reader.readAsBinaryString(f);
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

var UserPrompt = React.createClass({
  submit: function() {
    $.ajax({
      type: 'POST',
      url: '/upload',
      dataType: 'JSON', 
      data: {
        length: this.props.data.length,
      },
      success: function(data) {
        console.log(data);
        /*
        // Original code
        var error_list = [];
        for (var i=0; i<this.props.data.length; i+=10) {
          var data_chunk = [];
          for (var j=i; j<i+10 && j<this.props.data.length; j++) {
            data_chunk.push(this.props.data[j]);
          }
          $.ajax({
            type: 'PUT',
            url: '/upload',
            dataType: 'JSON',
            data: {
              index: i,
              data: data_chunk
            },
            error: function(data) {
              console.log('error:' + data.msg)
              error_list.push(data.msg);
            }
          });
          console.log(error_list);
        }
        */
        // Code for test
        $.ajax({
          type: 'PUT',
          url: '/upload',
          dataType: 'JSON',
          data: {
            index: 0,
            data: this.props.data[0]
          },
          error: function(data) {
            console.log('PUT error: ' + 0);
            console.log(data);
          }
        });
      }.bind(this),
      error: function(data) {
        console.log(data);
        this.submit();
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div id="userPrompt">
        <button className="btn btn-primary pull-right" type="submit" onClick={this.submit}>제출</button>
      </div>
    );
  }
});

var XLSParsedTable = React.createClass({
  render: function() {
    return (
      <div>
        <div id="table"
          style={{marginTop: 20 + 'px'}}
        ></div>
      </div>
    );
  }
});

var Container = React.createClass({
  setData: function(data) {
    if (this.state.table == undefined) {
      var container = document.getElementById('table');
      var table = new Handsontable(container, {
        data: this.state.data,
        rowHeaders: true,
        colHeaders: true
      });
      this.setState({
        table: table
      });
    }
    this.setState({
      data: data,
    });
    this.state.table.loadData(data);
  },
  getInitialState: function() {
    return {
      data: [],
      table: undefined
    };
  },
  render: function() {
    return (
      <div>
        <FileInputForm setData={this.setData} />
        <UserPrompt data={this.state.data} />
        <XLSParsedTable />
      </div>
    );
  }
});

ReactDOM.render(
  <Container />,
  document.getElementsByClassName("container")[0]
);
