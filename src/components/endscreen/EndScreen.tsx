import { View, StyleSheet, Text } from 'react-native';
import { BUTTONS, MESSAGES } from '../../util/texts';
import Button from '../UI/Button';

interface IProps {
  text: string;
  score: number;
  handleRestart: () => void;
}

const EndScreen: React.FC<IProps> = ({ text, score, handleRestart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.display}>{text}</Text>
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreDisplay}>
          {MESSAGES.score}: {score.toString()}
        </Text>
      </View>

      <View style={styles.button}>
        <Button text={BUTTONS.start} onPress={handleRestart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
  },
  score: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  display: {
    fontSize: 20,
  },
  scoreDisplay: {
    fontSize: 30,
  },
});

export default EndScreen;
