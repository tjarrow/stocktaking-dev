import React from 'react';
import '../server/data.js';
import nextId from "react-id-generator";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemRoom: '',
      itemId: '',
      itemCount: 1,
      equipments: this.props.equipments,
      editById: this.props.editById,
      itemRoom: this.props.roomName
    }
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
 }

  handleChangeItem = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState ({
      [name] : value
    });
  }

  handleAddItem = (e) => {
    e.preventDefault();
    // let comp = new Scorocode.Object("equipment");
      let comp = {
        "name": this.state.itemName,
        "room": this.props.roomName,
        "count": Number.parseInt(this.state.itemCount),
        "_id": nextId()
      };
      this.state.equipments.push(comp);
      console.info(this.state.equipments);
      console.info("Item added");
      // comp.save().then(() => {
      //   console.info("Item added");
      // });
  }

  handleEditItem = (e) => {
    e.preventDefault();
    var index = e.target.className;
    console.log(index);

      for (var i = 0; i < this.state.equipments.length; i++) {
           if(this.state.equipments[i]._id === index) {
             this.state.equipments[i]._id = this.state.itemId;
             this.state.equipments[i].name = this.state.itemName;
             this.state.equipments[i].count =  Number.parseInt(this.state.itemCount);
             console.info("Item edited");
            }
        }
      // equip.set("_id", this.state.itemId)
      // .set("name", this.state.itemName)
      // .set("count", Number.parseInt(this.state.itemCount));
      // equip.save().then(() => console.info("Item edited"));

  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    return (
      <div>
        <form className='add-item'>
          {this.props.showIdInput  &&
          <label>
            ID оборудования:
            <input
              className='add-item-id__input'
              type='text' name='itemId'
              placeholder='ID'
              onChange={e => this.handleChangeItem(e)} />
          </label>
          }
          <label>
            Название оборудования:
            <input
              className='add-item-name__input'
              type='text' name='itemName'
              value={this.state.itemName}
              placeholder='Стол'
              onChange={e => this.handleChangeItem(e)} />
          </label>

          <label>
            Количество:
            <input
              className='add-item-count__input'
              type='number'
              min = '1'
              name='itemCount'
              value={this.state.itemCount}
              onChange={e => this.handleChangeItem(e)} />
          </label>
          {this.props.showAddBtn &&
          <button onClick={e => this.handleAddItem(e)}  className="button">Добавить оборудование</button>
          }
          {this.props.showEditBtn &&
          <button onClick={e => this.handleEditItem(e)}  className={this.props.editById}>Редактировать оборудование</button>
          }
        </form>
      </div>
    )
  }
}

export default AddItem;
