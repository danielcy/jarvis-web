import React from 'react';

class TestPage extends React.Component {
    render() {
        return (
            <FileButton />
        )
    }
}

class FileButton extends React.Component {

    onChange() {
        console.log("Change!")
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


