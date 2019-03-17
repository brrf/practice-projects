import React from 'react';

let keys = [
  {
    value: 'AC',
    className: 'half',
    id: 'clear',
    style: {background: 'rgb(172, 57, 57)'}
  },
  {
    value: '/',
    className: 'quarter',
    id: 'divide',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: 'x',
    className: 'quarter',
    id: 'multiply',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '7',
    className: 'quarter',
    id: 'seven',
    style: {background: '#4d4d4d'}
  },
  {
    value: '8',
    className: 'quarter',
    id: 'eight',
    style: {background: '#4d4d4d'}
  },
  {
    value: '9',
    className: 'quarter',
    id: 'nine',
    style: {background: '#4d4d4d'}
  },
  {
    value: '-',
    className: 'quarter',
    id: 'subtract',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '4',
    className: 'quarter',
    id: 'four',
    style: {background: '#4d4d4d'}
  },
  {
    value: '5',
    className: 'quarter',
    id: 'five',
    style: {background: '#4d4d4d'}
  },
  {
    value: '6',
    className: 'quarter',
    id: 'six',
    style: {background: '#4d4d4d'}
  },
  {
    value: '+',
    className: 'quarter',
    id: 'add',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '1',
    className: 'quarter',
    id: 'one',
    style: {background: '#4d4d4d'}
  },
  {
    value: '2',
    className: 'quarter',
    id: 'two',
    style: {background: '#4d4d4d'}
  },
  {
    value: '3',
    className: 'quarter',
    id: 'three',
    style: {background: '#4d4d4d'}
  },
  {
    value: '=',
    id: 'equals',
    className: 'quarter double-height',
    style: {background: 'rgb(0, 68, 102)'}
  },
  {
    value: '0',
    className: 'half',
    id: 'zero',
    style: {background: '#4d4d4d'}
  },
  {
    value: '.',
    className: 'quarter',
    id: 'decimal',
    style: {background: '#4d4d4d'}
  },
];

export default function Keypad({handleEvent, display, expression}) {

	return (
		<div className='keypad'>
	      {keys.map( (button) => (
	        <button key={button.value} 
	                onClick={handleEvent} 
	                className={`key ${button.className}`} 
	                style={button.style}
	                disabled={(display === 'EXCEEDED MAX DIGITS' || expression === '%%%') ? true : false}
                  id={button.id}>
	          {button.value}
	        </button>
	      ))}
	    </div>
	)
}