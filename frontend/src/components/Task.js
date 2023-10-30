import React from 'react';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

  const Task = (props) => {
  return (
    <div 
    className="task"
    onDragOver={props.dragOverHandler}
    onDragLeave={props.dragLeaveHandler}
    onDragStart={props.dragStartHandler}
    onDragEnd={props.dragEndHandler}
    onDrop={props.dragDropHandler}
    draggable={props.isDraggable}
    >
        <div className="title">{props.title}</div>
        <div className="icons">
            <BiEdit className='icon' onClick={props.updateMode} />
            <AiFillDelete className='icon' onClick={props.deleteTask} />
        </div>
    </div>
  )
}

export default Task;