import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native';


let {width, height} = Dimensions.get("window");

export default Section = ({navigation, section}) => {
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
            <TouchableHighlight style={{ flex: 1 }} activeOpacity={0} onPress={() => {
                console.log("==|==> image clicked")
                navigation.navigate('ArtModal', {art: art})}
              } 
            >
              <Image
                style={{ flex: 1, resizeMode: 'cover' }}
                source={{ uri: art.img_url }}
              />
            </TouchableHighlight>
          </View>
        );
      })}
    </View>
  )
}
