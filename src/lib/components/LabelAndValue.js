import React from 'react';
import {Label} from './Label'

export const LabelAndValue = (props) => {
    let {currentKey, marginLeft, type, value, isLastSibling, styles} = props;
    return (
      <span key={`label_and_value_${currentKey}`}>
        <Label
          value={currentKey}
          type="property"
          isLastSibling={isLastSibling}
          marginLeft={marginLeft}
          styles={styles}/>
        <Label
          value={value}
          type={type}
          isLastSibling={isLastSibling}
          marginLeft={1}
          styles={styles}/>
      </span>
    );
  }
