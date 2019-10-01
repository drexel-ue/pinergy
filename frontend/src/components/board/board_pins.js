import React, { Component } from 'react'
import BoardPinHeader from './board_pins_header_container'
import BoardPinItems from './board_pin_items'
export default class board_pins extends Component {
  render() {
    // debugger
    return (
      <div>
        <BoardPinHeader boardName/>
        {/* <BoardPinItems pins={}/> */}
      </div>
    )
  }
}
