import React from 'react';
import './App.css';
import ConfirmationPage from "./ConfirmationPage";
import HomePage from "./HomePage";
import GubangPage from "./GubangPage";

const NAVI_ACTIVE_COLOR = 'rgba(240,248,255, 0.3)';
const NAVI_DEACTIVE_COLOR = '#282c34';
const NAVI_HOVER_COLOR = '#555';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      naviBtnBackgrounds: this.initNaviList(),
      chosenNavi: 0,
      contentPage: [
          this.renderHomePage(), this.renderTestPage(), this.renderGubangPage()
      ]
    };
    //his.initState();
  }

  initNaviList() {
    let list = Array(10).fill(NAVI_DEACTIVE_COLOR);
    list[0] = NAVI_ACTIVE_COLOR;
    return list;
  }

  // Navi Bar
  handleNaviClick(i) {
    const list = this.state.naviBtnBackgrounds.slice();
    list.forEach(
        (value, index) => {
          if (index === i) {
            list[index] = 'rgba(240,248,255, 0.3)';
          } else {
            list[index] = '#282c34';
          }
        }
    );
    this.setState({
      naviBtnBackgrounds: list,
      chosenNavi: i,
    })
  }

  renderNaviBtn(i, name) {
    return (<li><NaviBtn
        value = {name}
        background = {this.state.naviBtnBackgrounds[i]}
        activate = {this.state.chosenNavi === i}
        onClick = {() => this.handleNaviClick(i)}
    /></li>)
  }

  renderNaviBar() {
    return (
        <ul>
          {this.renderNaviBtn(0, '主页')}
          {this.renderNaviBtn(1, '测试工作台')}
          {this.renderNaviBtn(2, '股帮')}
        </ul>
    )
  }

  // Content Page
  renderHomePage() {
    return <HomePage />
  }

  renderTestPage() {
    return <ConfirmationPage />
  }

  renderGubangPage() {
      return <GubangPage />
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p>
              Jarvis Workstation
            </p>
          </header>
          <body>
          <div className="NaviBar">
            {this.renderNaviBar()}
          </div>
          <div className="ContentPage">
            {this.state.contentPage[this.state.chosenNavi]}
          </div>
          </body>
        </div>
    );
  }
}

class NaviBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  triggerHover = () => {
    const hover = this.state.hover;
    this.setState({
      hover: !hover
    })
  };

  render() {
    const background = !this.props.activate && this.state.hover ? NAVI_HOVER_COLOR : this.props.background;
    return (
        <div className='NaviBtn'>
          <button
              style = {{
                background: background,
              }}
              onMouseEnter={this.triggerHover}
              onMouseLeave={this.triggerHover}
              onClick={this.props.onClick}
          >{this.props.value}</button>
        </div>
    )
  }
}

export default App;
