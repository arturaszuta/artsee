import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, AsyncStorage } from "react-native";
import Constants from 'expo-constants';

import Section from './Section';
import SectionButton from './SectionButton';
import ProfileSection from './ProfileSection';

export default ProfileScreen = ({navigation, arts, setTag, users}) => {
  
  let [followingComp, setFollowingComp] = useState([]);
  let [activeIndex, setActiveIndex] = useState(0);
  let [likedArt, setLikedArt] = useState([]);
  let [seenArt, setSeenArt] = useState([]);
  let [bookmarkedArt, setBookmarkedArt] = useState([]);

  const screens = {
    0: likedArt,
    1: seenArt,
    2: bookmarkedArt
  }

  // get seen, liked, and bookmarked art
  useEffect(() => {
    if (users.user && arts) {
      const liked = Object.keys(arts).filter(art => arts[art].liked).map(id => arts[id])
      const bookmarked = Object.keys(arts).filter(art => arts[art].seelist).map(id => arts[id])
      const seen = Object.keys(arts).filter(art => arts[art].visited).map(id => arts[id])

      setLikedArt(liked);
      setBookmarkedArt(bookmarked);
      setSeenArt(seen);
    }
  }, [arts])
  
  if (users.user) {
    return (
      <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
        <View style={{ flex: 1 }}>
          <ProfileSection user={users.user} followingComp={followingComp} users={users} />
          <Button onPress={e => {
            AsyncStorage.clear();
            navigation.navigate('Auth');
          }} title="logout" />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderTopWidth: 1,
                borderTopColor: "#eae5e5"
              }}
            >

              <SectionButton setActiveIndex={setActiveIndex} activeIndex={activeIndex} sectionNum={0} icon={'heart'} />
              <SectionButton setActiveIndex={setActiveIndex} activeIndex={activeIndex} sectionNum={1} icon={'eye'} />
              <SectionButton setActiveIndex={setActiveIndex} activeIndex={activeIndex} sectionNum={2} icon={'bookmark'} />
              
            </View>
            <Section section={screens[activeIndex]} navigation={navigation} setTag={setTag} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    AsyncStorage.clear();
    navigation.navigate('Auth');
    return null
  }
};
