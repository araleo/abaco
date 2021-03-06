import { View, StyleSheet, Text } from 'react-native';
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
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  display: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Top;
