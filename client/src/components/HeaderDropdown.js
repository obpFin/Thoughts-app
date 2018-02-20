import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DropDown extends React.Component {

  state = {
    menuActive: false
  };

  toggleMenu = () => {
    console.log("toggleMenu");
    let menuActive = !this.props.menuActive;
    this.setState({
      menuActive
    });
  };

  handleClickLogOut = (e) => {
    this.props.handleToggleSettings();
    this.props.handleLogOut(e);
  };

  render() {
    let menu;
    if(this.props.menuActive) {
      menu = <ul className="menuitems">
                <li><a href="#">Settings</a></li>
                <li><a onClick={this.handleClickLogOut} href="#">Log out</a></li>
              </ul>
                
              
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