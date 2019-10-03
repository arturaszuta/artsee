import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, ImageBackground, Dimensions, Image, FlatList, ScrollView } from "react-native";
import { Thumbnail, Content, Icon, Button, ListItem  } from 'native-base';

const ProfileScreen = ({navigation}) => {
  let [token, setToken] = useState('');
  let [userId, setUserId] = useState('');
  let [userData, setUserData] = useState({}); 
  let [followingComp, setFollowingComp] = useState([]);
  let [activeIndex, setActiveIndex] = useState(0);
  let [likedArt, setLikedArt] = useState([]);
  let [seenArt, setSeenArt] = useState([]);
  let [bookmarkedArt, setBookmarkedArt] = useState([]);

  let {width, height} = Dimensions.get("window");

  _handleLogout = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate('Auth');
    } catch (err) {
      console.error(err);
    }
  };

  _fetchDeviceStorage = async () => {
    try {
      const fetchedToken = await AsyncStorage.getItem('token');
      setToken(fetchedToken);
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch(err) {
      console.error(err);
    }
  };

  _segmentClicked = (index) => {
    setActiveIndex(index);
  };

  renderSection = () => {
    if (activeIndex === 0) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
          {renderLikedSection()}
        </View>
      );
    } else if (activeIndex === 1) {
      return (
        <View style={{ flexDirection:"row", flexWrap:"wrap", flex: 1 }}>
          {renderSeenSection()}
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1  }}>
          {renderBookmarkedSection()}
        </View>
      );
    }
  };

  renderLikedSection = () => {
    return likedArt.map((art, idx) => {
      return (
        <View
          key={idx}
          style={[
            {width: (width)/3}, {height: (width)/3}, 
            {marginBottom: 2},
            idx % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
          ]}
        >
          <Image
            style={{flex: 1, width:undefined, height:undefined}}
            source={{ uri: art.img_url }}
          />
        </View>
      );
    })
  }

  renderSeenSection = () => {
    return seenArt.map((art, idx) => {
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
    });
  };

  renderBookmarkedSection = () => {
    return bookmarkedArt.map((art, idx) => {
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
    });
  };

  // get user profile information
  useEffect(() => {
      _fetchDeviceStorage();
      if (userId) {
         fetch(`https://artsee-back-end.herokuapp.com/users/${userId}`, {
           method: "GET",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: token
           }
         })
           .then(res => res.json())
           .then(data => {
             setUserData(data);
           })
           .catch(err => console.error(err));
         
    }
  }, [userId, token]);

  // get seen, liked, and bookmarked art
  useEffect(() => {
    if (userId) {
       fetch(
         `https://artsee-back-end.herokuapp.com/api/userArts?user_id=${userId}`,
         {
           method: "GET",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: token
           }
         }
       )
         .then(res => res.json())
         .then(data => {
           const liked = data.filter(art => art.liked);
           const bookmarked = data.filter(art => art.seelist);
           const seen = data.filter(art => art.visited);

           setLikedArt(liked);
           setBookmarkedArt(bookmarked);
           setSeenArt(seen);
         })
         .catch(err => console.error(err));
    }
  }, [userId, likedArt, bookmarkedArt, seenArt])
  

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            height: "55%",
            width: "100%",
            justifyContent: "space-between",
            flex: 1
          }}
          source={{ uri: userData.background }}
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
              source={{ uri: userData.avatar }}
            />
            <Text
              style={{ fontSize: 30, alignSelf: "flex-end", marginRight: 20 }}
            >
              {userData.name}
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
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopWidth: 1,
              borderTopColor: "#eae5e5"
            }}
          >
            <Button
              transparent
              onPress={() => _segmentClicked(0)}
              active={activeIndex === 0}
            >
              <Icon
                name="heart"
                style={activeIndex === 0 ? {} : { color: "grey" }}
              />
            </Button>
            <Button
              transparent
              onPress={() => _segmentClicked(1)}
              active={activeIndex === 1}
            >
              <Icon
                name="eye"
                style={activeIndex === 1 ? {} : { color: "grey" }}
              />
            </Button>
            <Button
              transparent
              onPress={() => _segmentClicked(2)}
              active={activeIndex === 2}
            >
              <Icon
                name="bookmark"
                style={activeIndex === 2 ? {} : { color: "grey" }}
              />
            </Button>
          </View>
          {renderSection()}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;