import React from 'react';
import { Image, View, Dimensions } from 'react-native';


let {width, height} = Dimensions.get("window");

export default Section = ({section}) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
      {section.map((art, idx) => {
        return (
          <View
            key={idx}
            style={[
              { width: width / 3 },
              { height: width / 3 },
              { marginBottom: 2 },
              idx % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
            ]}
          >
            <Image
              style={{ flex: 1, width: undefined, height: undefined }}
              source={{ uri: art.img_url }}
            />
          </View>
        );
      })}
    </View>
  )
}