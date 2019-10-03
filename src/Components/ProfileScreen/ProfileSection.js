import React from 'react';
import { View, Text, ImageBackground } from "react-native";
import { Thumbnail } from 'native-base';

export default ProfileSection = ({user, followingComp}) => {
  return (
    <ImageBackground
      style={{
        height: "55%",
        width: "100%",
        justifyContent: "space-between",
        flex: 1
      }}
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
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            marginTop: 60,
            marginLeft: 5
          }}
          source={{ uri: user.avatar }}
        />
        <Text
          style={{ fontSize: 30, alignSelf: "flex-end", marginRight: 20 }}
        >
          {user.name}
        </Text>
      </View>
      {followingComp.length > 0 ? (
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text>Following</Text>
          <View stype={{ flexDirection: "row" }}>{followingComp}</View>
        </View>
      ) : (
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text>Following</Text>
          <Text>No One</Text>
        </View>
      )}
    </ImageBackground>
  )
}