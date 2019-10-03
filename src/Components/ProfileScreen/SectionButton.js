import React from 'react';
import { Icon, Button  } from 'native-base';

export default SectionButton = ({sectionNum, icon, activeIndex, setActiveIndex}) => {
  return (
    <Button
      transparent
      onPress={() => setActiveIndex(sectionNum)}
      active={activeIndex === sectionNum}
    >
      <Icon
        name={icon}
        style={activeIndex === sectionNum ? {} : { color: "grey" }}
      />
    </Button>
  )
}