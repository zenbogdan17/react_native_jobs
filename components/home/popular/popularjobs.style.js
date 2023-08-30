import { StyleSheet } from 'react-native';

import { FONT, SIZES, COLORS } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  textError: {
    color: COLORS.error,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    fontWeight: 'bold',
  },

  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default styles;
