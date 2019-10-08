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
  headImage: {
    borderRadius: 50,
    marginRight: 10,
    borderColor: colors.color3,
    borderWidth: 2
  },
  title: {
    fontSize: 16,
    color: colors.color2,
    paddingTop: 10,
    paddingLeft: 16
  },
  iconContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  icons: {
    margin: 15,

  },
  comment: {
    color: colors.color2,
    fontSize: 16,
    paddingLeft: 18
  },
  line: {
    color: colors.bottLine,
    fontSize: 18,
    paddingTop: 15
  }
});