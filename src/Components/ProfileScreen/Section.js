import React from 'react';
import { View, Dimensions } from 'react-native';
import { TouchableHighlight, FlatList } from 'react-native';

import CachedImage from '../../helpers/CachedImage';

let {width, height} = Dimensions.get("window");


export default Section = ({navigation, section, setTag}) => {
  const data = section.map((art, idx) => {
    const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + 200 + '/x/' + art.img_url;
    return {
      id: art.id,
      imgUrl,
      art,
      idx
    };
  })

  const Item = ({art, imgUrl, idx, setTag}) => {
    return (
      <View
        key={art.imgUrl}
        style={[
          { width: width / 3 },
          { height: width / 3 },
          { marginBottom: 2 },
          idx % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
        ]}
      >
        <TouchableHighlight style={{ flex: 1 }} activeOpacity={0} onPress={() => {
            navigation.navigate('ArtModal', {artId: art.id})}
          } 
        >
          <CachedImage
            style={{ flex: 1, resizeMode: 'cover', width: "100%" }}
            source={imgUrl}
            title={art.id}
          />
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <FlatList
      style={{margin:2}}
      numColumns={3}                   
      data={data}
      renderItem={({item}) => <Item imgUrl={item.imgUrl} art={item.art} idx={item.idx} setTag={setTag} />}
      keyExtractor={(item) => item.id}
    />
  )
}