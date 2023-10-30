import React from 'react';

const FieldAndBtn = (props) => {
  return (
    <div className='fieldAndBtn'>
        <input 
        type="text" 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        />

        <div 
        className="btn" 
        onClick={props.onClick}
        >
        { props.title }
        </div>
    </div>
  )
}

export default FieldAndBtn;