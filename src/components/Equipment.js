import React, { Component } from 'react';
import {InputErrors} from './InputErrors.js';
import _buildings from "../buildings0.json";
// import equipment from "../equipment.json";
import nextId from "react-id-generator";

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: [],
      buildings: _buildings,
      showEditBtn: false,
      showAddBtn: true,
      showIdInput: false,
      showRoomInput: true,
      validRoomNumber: true,
      editByName:'',
      itemName: '',
      itemId: '',
      itemRoom:'',
      itemCount: 1,
      editById:'',
      // inputErrors: {itemName: '', itemId: ''},
      itemNameValid: false,
      itemIdValid: false
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleTransferItem = this.handleTransferItem.bind(this);
  }

    handleChangeInput = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState ({
        [name] : value
      }
      //,
      //() => { this.validateField(name, value) }
    );
    }

    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.inputErrors;
      let itemNameValid = this.state.itemNameValid;
      // let itemIdValid = this.state.itemIdValid;
    if (fieldName === 'itemName')
    {
      itemNameValid = value.length >= 6;
      fieldValidationErrors.itemName = itemNameValid ? '' : ' is invalid';
    }

      this.setState({inputErrors: fieldValidationErrors,
                    itemNameValid: itemNameValid,
                    // itemIdValid: itemIdValid
                  }, this.validateFormName);
      }

      validateFormName() {
          this.setState({itemNameValid: this.state.itemNameValid });
          console.log(this.state.inputErrors);
      }

    handleAddItem = (e) => {
      e.preventDefault();
        let comp = {
          "name": this.state.itemName,
          "room": this.props.room_name,
          "count": Number.parseInt(this.state.itemCount),
          "_id": nextId()
        };
        this.setState({equipments: this.state.equipments.concat(comp)},
        () => localStorage.setItem('equipments', JSON.stringify(this.state.equipments))
      );
        console.info("Item added");

        this.state.itemName = '';
        this.state.itemCount = 1;
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
        this.setState({
          equipments: this.state.equipments,
          itemId: '',
          itemName: '',
          itemCount: 1,
          showEditBtn: !this.state.showEditBtn,
          showAddBtn: !this.state.showAddBtn,
          showIdInput: !this.state.showIdInput,
          showRoomInput:!this.state.showRoomInput
        },
        () => localStorage.setItem('equipments', JSON.stringify(this.state.equipments))
      );
    }

    handleDeleteItem = (e) => {
      var index = e.target.id;
      console.log(index);
      const equipments = this.state.equipments.filter(el => el._id !== index);
      this.setState({equipments},
      () => localStorage.setItem('equipments', JSON.stringify(this.state.equipments))
      );
      console.info(this.state.equipments);
    }

    handleTransferItem = (e) => {
      e.preventDefault();
      var index = e.target.className;

      let roomnames = [];

      this.state.buildings.map(building => {
        building.rooms.map(room => {
          room.children.map(item => {
            item.children.map(i => {
              roomnames.push(i.name);
            });
          });
        });
      });

      console.log(this.state.itemRoom);

      let valid_room = roomnames.filter(name => name === this.state.itemRoom);

      if (valid_room.length === 0) {
          alert("Такой комнаты не существует");
          this.state.validRoomNumber = false;
        } else {
          this.state.validRoomNumber = true;
        }

      if (this.props.room_name === this.state.itemRoom) {
        alert("Вы уже находитесь в этой комнате");
        this.state.validRoomNumber = false;
        } else {
          this.state.validRoomNumber = true;
        }


      console.log(this.state.validRoomNumber);

      for (var i = 0; i < this.state.equipments.length; i++) {
         if((this.state.equipments[i]._id === index) && (this.state.validRoomNumber)) {
           this.state.equipments[i].room = this.state.itemRoom;
       }
      }
      if (this.state.validRoomNumber) {
        this.setState(
          { equipments: this.state.equipments,
            itemId: '',
            itemName: '',
            itemCount: 1,
            itemRoom: '',
            showEditBtn: !this.state.showEditBtn,
            showAddBtn: !this.state.showAddBtn,
            showIdInput: !this.state.showIdInput,
            showRoomInput:!this.state.showRoomInput
          },
          () => localStorage.setItem('equipments', JSON.stringify(this.state.equipments))
        );
      }
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
    this.state.itemId = index;
    for (var i = 0; i < this.state.equipments.length; i++) {
         if(this.state.equipments[i]._id === index) {
           this.state.itemName = this.state.equipments[i].name;
         }
      }
  //  this.state.editByName = item.name;
    console.info(this.state.itemName);
    console.log(this.state.itemId);
    this.setState({
      showEditBtn: !this.state.showEditBtn,
      showAddBtn: !this.state.showAddBtn,
      showIdInput: !this.state.showIdInput,
      showRoomInput:!this.state.showRoomInput
    });

  }

  componentDidMount() {

    const default_equipment = [];

    const equipment = localStorage.getItem('equipments');
    const eq  =  equipment ? JSON.parse(equipment ) : default_equipment;
        this.setState({
          equipments: eq
        });

    console.log('Fetching data');
  }

  componentDidUpdate() {

    this.render();
  }

  componentWillUnmount() {
    console.log('Component will unmount');
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
                value={this.state.itemId}
                className='add-item-id__input'
                type='text' name='itemId'
                placeholder='ID'
                onChange={this.handleChangeInput}
                />
            </label>
            }
            <label>
              Название оборудования:
              <input
                className='add-item-name__input'
                type='text' name='itemName'
                value={this.state.itemName}
                placeholder='Стол'
                onChange={e => this.handleChangeInput(e)}
                 />
            </label>
            <label>
              Количество:
              <input
                className='add-item-count__input'
                type='number'
                min = '1'
                name='itemCount'
                value={this.state.itemCount}
                onChange={e => this.handleChangeInput(e)} />
            </label>
            {this.state.showAddBtn &&
            <button onClick={e => this.handleAddItem(e)}  className="button">Добавить оборудование</button>
            }
            {this.state.showEditBtn &&
            <button onClick={e => this.handleEditItem(e)} className={this.state.itemId}>Редактировать оборудование</button>
            }
            {this.state.showEditBtn &&
            <label className='add-item-room__input'>Номер комнаты:
              <input
                type="number"
                name='itemRoom'
                onChange={e => this.handleChangeInput(e)} />
                </label>
            }
            {this.state.showEditBtn &&
            <button onClick={e => this.handleTransferItem(e)} className={this.state.itemId}>Перенести в другую комнату </button>
            }
          </form>

        </div>

      </div>
    );
  }
}

export default Equipment;
