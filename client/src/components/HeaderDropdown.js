import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuActive: true
    };
  }

  toggleMenu() {
    let menuState = !this.props.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  render() {
    let menu;
    if(this.props.menuActive) {
      menu = <div>
                <ul>
                  <li>First Item </li>
                  <li>Second Item </li>
                  <li>Third Item </li>
                </ul>
              </div>
    } else {
      menu = "";
    }
    return (
      <div className="settingsMenu">
      <ReactCSSTransitionGroup transitionName = "menu" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        {menu}
      </ReactCSSTransitionGroup>
    </div>
    )
  }
}

export default DropDown;