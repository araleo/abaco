import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../util/colors';
import { LABELS } from '../../util/texts';

interface IProps {
  score: number;
  lifes: number;
}

const Top: React.FC<IProps> = ({ score, lifes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>
        {LABELS.score}: {score}
      </Text>
      <Text style={styles.display}>
        {LABELS.lifes}: {lifes}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.darkGrey,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  display: {
    fontSize: 20,
  },
});

export default Top;
