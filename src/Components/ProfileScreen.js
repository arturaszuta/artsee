import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, ImageBackground, Dimensions, Image } from "react-native";
import { Thumbnail, Content, Icon, Button } from 'native-base';

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
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
          {renderLikedSection()}
        </View>
      );
    } else if (activeIndex === 1) {
      return (
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
          {renderSeenSection()}
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
            idx % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0}
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
            idx % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
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
            idx % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
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
           .then(
             // get users they're following
             fetch(`https://artsee-back-end.herokuapp.com//users/${userId}/following`, {
               method: "GET",
               headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 Authorization: token
               }
             })
               .then(res => res.json())
               .then(data => {
                 const comp = data.map((obj, idx) => {
                   return (
                     <Thumbnail
                       key={data[idx].id}
                       id={data[idx].id}
                       style={{ height: 50, width: 50, marginRight: 5 }}
                       source={{ uri: data[idx].avatar }}
                     />
                   );
                 });
                 setFollowingComp(comp);
               })
               .catch(err => console.error(err))
           );
    }
  }, [userId, token]);

  // get seen, liked, and bookmarked art
  useEffect(() => {
    // FIXME: change hardcoded user_id
    fetch(`https://artsee-back-end.herokuapp.com/api/userArts?user_id=${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        let artPromises = [];
        for (let artIdx in data) {
          if (data[artIdx].liked === true) {
            artPromises.push(
              fetch(
                `https://artsee-back-end.herokuapp.com/arts/${data[artIdx].art_id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    // Authorization: token
                  }
                }
              )
            );
          }
        }
        Promise.all(artPromises)
          .then(data => {
            Promise.all(data.map(art => art.json())).then(arts => {
              setLikedArt(arts);
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));


   // get seen art
   // FIXME: change hardcoded user_id
    fetch(
      `https://artsee-back-end.herokuapp.com/api/userArts?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // Authorization: token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        let artPromises = [];
        for (let artIdx in data) {
          if (data[artIdx].visited === true) {
            artPromises.push(
              fetch(
                `https://artsee-back-end.herokuapp.com/arts/${data[artIdx].art_id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    // Authorization: token
                  }
                }
              )
            );
          }
        }
        Promise.all(artPromises)
          .then(data => {
            Promise.all(data.map(arts => arts.json())).then(arts => {
              setSeenArt(arts);
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

  // get bookmarked art
   // FIXME: change hardcoded user_id
    fetch(
      `https://artsee-back-end.herokuapp.com/api/userArts?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // Authorization: token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        let artPromises = [];
        for (let artIdx in data) {
          if (data[artIdx].seelist === true) {
            artPromises.push(
              fetch(
                `https://artsee-back-end.herokuapp.com/arts/${data[artIdx].art_id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    // Authorization: token
                  }
                }
              )
            );
          }
        }
        Promise.all(artPromises)
          .then(data => {
            Promise.all(data.map(arts => arts.json())).then(arts => {
              setBookmarkedArt(arts);
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          height: "55%",
          width: "100%",
          justifyContent: "space-between"
        }}
        source={{ uri: userData.background }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text>Following</Text>
          {followingComp}
        </View>
      </ImageBackground>
      <View>
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
        <Content>{renderSection()}</Content>
      </View>
    </View>
  );
};

export default ProfileScreen;