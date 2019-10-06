import { StyleSheet } from 'react-native';
import { colors } from './variables';

export default artCardStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 24
  },
  head: {
    color: colors.color1,
    fontSize: 20,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  icons: {
    margin: 7,

  },
  comment: {
    color: colors.color2,
    fontSize: 16,
    paddingLeft: 18
  }
});