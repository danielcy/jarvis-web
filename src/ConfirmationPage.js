import React from 'react';
import "./ConfirmationPage.css"

class ConfirmationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationTemplateFile: null,
            inputTemplateFile: null,
            result: "x",
        };

        this.uploadConfirmationTemplate = this.uploadConfirmationTemplate.bind(this);
        this.uploadInputTemplate = this.uploadInputTemplate.bind(this);
    }

    uploadConfirmationTemplate(e) {
        let file = e.target.files[0];
        this.setState({
            confirmationTemplateFile: file,
        });
        this.execute("a")
    }

    uploadInputTemplate(input) {
        this.setState({
            inputTemplateFile: input.target.files[0]
        });
    }

    execute(d) {
        var data = JSON.stringify({"data":d});

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "http://127.0.0.1:8000/test");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    render() {
        return (
            <div className='ConfirmationPage'>
                <h2>Happy Confirmation Maker</h2>
                <br/>
                <p>
                    上传函证模板
                    <br/><br/>
                    {/*TODO: confirmation template upload*/}
                    <UploadButton
                        accept = {"application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                        onChange = {this.uploadConfirmationTemplate}
                    />
                    <br/>
                    <label className='UploadResult'>
                        {this.state.confirmationTemplateFile == null ? '未上传': this.state.confirmationTemplateFile.name}
                    </label>
                </p>
                <p>
                    上传输入模板
                    <br/><br/>
                    {/*TODO: confirmation template upload*/}
                    <UploadButton
                        accept = {"application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                        onChange = {this.uploadInputTemplate}
                    />
                    <br/>
                    <label className='UploadResult'>
                        {this.state.inputTemplateFile == null ? '未上传': this.state.inputTemplateFile.name}
                    </label>
                </p>
                <p>
                    <ExecuteButton />
                </p>
                <br/><br/><br/><br/>

            </div>
        )
    }
}

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.getFiles = this.getFiles.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    getFiles() {
        let ans = [];
        let files = this.refs.fileLoader.files;
        for (let i = 0; i < files.length; i++) {
            ans.push(files[i])
        }
        return ans
    }

    onChange() {
        console.log(this.getFiles())
    }

    render() {
        let accept = this.props.accept;
        return (
            <label className="UploadButton">
                点击这里上传文件
                <input ref='fileLoader' onChange={this.props.onChange} type="file" accept={accept} />
            </label>
        );
    }
}

class ExecuteButton extends React.Component {
    render() {
        return (
            <label className='ExecuteButton'>
                <button>GoGoGo!</button>
            </label>
        )
    }
}

export default ConfirmationPage;


