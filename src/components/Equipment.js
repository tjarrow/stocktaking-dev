import React from 'react';
import equipment from "../equipment.json";
import nextId from "react-id-generator";

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: [],
      showEditBtn: false,
      showAddBtn: true,
      showIdInput: false,
      showRoomInput: true,
      editByName:'',
      itemName: '',
      itemId: '',
      itemCount: 1,
      editById:''
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
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
        let comp = {
          "name": this.state.itemName,
          "room": this.props.room_name,
          "count": Number.parseInt(this.state.itemCount),
          "_id": nextId()
        };
        this.setState({equipments: this.state.equipments.concat(comp)});
        console.info("Item added");
          this.render();
    }

    handleEditItem = (e) => {
      e.preventDefault();
      var index = e.target.className;
      console.log(index);
      // const item = this.state.equipments.filter(el => el._id == index);
      // console.log(item);
      for (var i = 0; i < this.state.equipments.length; i++) {
           if(this.state.equipments[i]._id === index) {
             this.state.equipments[i]._id = this.state.itemId;
             this.state.equipments[i].name = this.state.itemName;
             this.state.equipments[i].count =  Number.parseInt(this.state.itemCount);
             console.info("Item edited");
            }
        }
        this.setState({equipments: this.state.equipments });
    }

    handleDeleteItem = (e) => {
      var index = e.target.id;
      console.log(index);
      const equipments = this.state.equipments.filter(el => el._id !== index);
      this.setState({equipments}, console.log);
      console.info(this.state.equipments);
    }

  findItem = (room_name) => {
    return this.state.equipments
    .filter((e) => e.room === room_name)
    .map((equipment, index) => (
      <div className="equipment-item">
        <span room={`${equipment.room}`} key={index}>{equipment.name} - x{equipment.count}</span>
        <div className='btn-wrap'>
          <button id={`${equipment._id}`} onClick={e => this.handleDeleteItem(e)}>Удалить</button>
          <button className={`${equipment._id}`} onClick={this.handleShowEditComponents}>Редактировать </button>
        </div>
      </div>
    ))
  }

  handleShowEditComponents = (e) => {
    var index = e.target.className;
    //const item = this.state.equipments.filter(el => el._id == index);
    this.state.editById = index;
    for (var i = 0; i < this.state.equipments.length; i++) {
         if(this.state.equipments[i]._id === index) {
           this.state.editByName = this.state.equipments[i].name;
         }
      }
  //  this.state.editByName = item.name;
    console.info(this.state.editByName);
    console.log(this.state.editById);
    this.setState({
      showEditBtn: !this.state.showEditBtn,
      showAddBtn: !this.state.showAddBtn,
      showIdInput: !this.state.showIdInput,
      showRoomInput:!this.state.showRoomInput
    });

  }

  componentDidMount() {
      this.setState({
        equipments: equipment
      });
      console.info(equipment);
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    const room_name = this.props.room_name;
    return (
      <div>
        <span className="room_number__header">{this.props.room_name}</span>
        <span className="equipment-item__header">Список оборудования:</span>
        {this.findItem(room_name)}
        <div>
          <form className='add-item'>
            {this.state.showIdInput  &&
            <label>
              ID оборудования:
              <input
                value={this.state.editById}
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
                // value={this.state.editByName}
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
            {this.state.showAddBtn &&
            <button onClick={e => this.handleAddItem(e)}  className="button">Добавить оборудование</button>
            }
            {this.state.showEditBtn &&
            <button onClick={e => this.handleEditItem(e)}  className={this.state.editById}>Редактировать оборудование</button>
            }
          </form>
          <form>

          </form>
        </div>

      </div>
    );
  }
}

export default Equipment;
