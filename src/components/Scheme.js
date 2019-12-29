import React from 'react';
import Tree from './Tree';
import Equipment from './Equipment';
import Versions from './Versions';

class Scheme extends React.Component {
  constructor() {
    super();
    this.state = {
      showEq: false,
      showEqItem: false,
      id: '',
      room_name: '',
      numOfRepClicks: 0
    };
  }

  handleShowEqItem = e => {
    const clickedSameButton = (this.state.id === e.target.id);
    let showEqItem = true;
    if(clickedSameButton) {
      this.setState({numOfRepClicks: this.state.numOfRepClicks+1});
      if(this.state.numOfRepClicks % 2 === 0) {
        showEqItem = false;
      }
    } else {
      this.setState({numOfRepClicks: 0});
    }
    this.setState ({
      showEqItem,
      id: e.target.id,
      room_name: e.target.className
    });
  }

  render() {
   return (
    <div className="container">
    <Versions/>
      <div className="panel-left">
        <Tree
          onToggleEqItem={this.handleShowEqItem}
        />
    </div>
      <div className="panel-right">
          { this.state.showEqItem
            &&
            <Equipment
              id={this.state.id}
              room_name={this.state.room_name}
            /> }
        </div>
      </div>
    );
  }
}
export default Scheme;
