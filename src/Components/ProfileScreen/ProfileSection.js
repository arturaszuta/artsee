import React from 'react';
import { View, Text, ImageBackground, ScrollView, Dimensions } from "react-native";
import { Thumbnail } from 'native-base';
import CachedImage from '../../helpers/CachedImage'
import profileStyle from '../../../styles/profileSection';

const width = Math.round(Dimensions.get('window').width);

const userAvatar = (ogUser) => {
  return (
    <CachedImage style={profileStyle.followers} 
      source={ogUser.avatar}
      title={ogUser.email}
      height={32}
      key={ogUser.id}
    />
  )
}

export default ProfileSection = ({user, users}) => {
  return (
    <ImageBackground
      style={profileStyle.profileBG}
      source={{ uri: user.background }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <Thumbnail
          style={profileStyle.thumbnail}
          source={{ uri: user.avatar }}
        />
        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
          <Text
            style={profileStyle.username}
          >
            {user.name}
          </Text>
          <View style={{ height: 44, paddingRight: 10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: 210, alignSelf: 'flex-end' }}>
              {[17,18,19,20,25,24,23,21].map(id => {
                return userAvatar(users[id])
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}
