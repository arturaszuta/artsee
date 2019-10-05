import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, AsyncStorage } from "react-native";

import { useApplicationData } from '../../hooks/useApplicationData';
import Section from './Section';
import SectionButton from './SectionButton';
import ProfileSection from './ProfileSection';

const ProfileScreen = ({navigation}) => {
  const {
    state,
    userLogout
  } = useApplicationData();

  console.log("==|==> ProfileScreen")
  
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
    if (state.user && state.arts) {
      const liked = Object.keys(state.arts).filter(art => state.arts[art].liked).map(id => state.arts[id])
      const bookmarked = Object.keys(state.arts).filter(art => state.arts[art].seelist).map(id => state.arts[id])
      const seen = Object.keys(state.arts).filter(art => state.arts[art].visited).map(id => state.arts[id])

      setLikedArt(liked);
      setBookmarkedArt(bookmarked);
      setSeenArt(seen);
    }
  }, [state.arts])
  
  if (state.user) {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ProfileSection user={state.user} followingComp={followingComp} />
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
            <Section section={screens[activeIndex]} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return null
  }
};

export default ProfileScreen;