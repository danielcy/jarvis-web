import React from 'react';

class TestPage extends React.Component {
    render() {
        return (
            <FileButton />
        )
    }
}

class FileButton extends React.Component {
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
        let accept = 'image/jpeg,image/gif,image/png,image/bmp,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        return (
            <label className="TestBtn">
                <input ref='fileLoader' onChange={this.onChange} type="file" accept={accept} multiple />
            </label>
        );
    }
}

export default TestPage;


