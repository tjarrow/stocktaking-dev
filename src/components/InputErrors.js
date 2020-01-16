import React from 'react';

export  const InputErrors = ({inputErrors}) =>
  <div className='InputErrors'>
    {Object.keys(InputErrors).map((fieldName, i) => {
      if(InputErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {InputErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>
