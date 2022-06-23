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
      <Text style={styles.display}>{text}</Text>
      <Text>
        {MESSAGES.score}: {score.toString()}
      </Text>
      <Button text={BUTTONS.start} onPress={handleRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
  },
  display: {
    fontSize: 20,
  },
});

export default EndScreen;
