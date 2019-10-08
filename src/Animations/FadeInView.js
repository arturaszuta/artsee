import React from 'react';
import { Animated } from 'react-native';

export default FadeInView = (props) => {
  const [fadeAnim] = React.useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        position: "absolute", 
        bottom: 20, 
        height: "95%", 
        width: "100%",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5, 
        borderRadius: 10,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}