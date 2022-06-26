import { Modal, View, Text, StyleSheet } from 'react-native';
import { BUTTONS, MESSAGES } from '../../util/texts';
import Top from '../top/Top';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  playerWon: boolean;
  levelScore: number;
  totalScore: number;
  lifes: number;
  restart: () => void;
  nextLevel: () => void;
}

const EndLevelModal: React.FC<IProps> = ({
  visible,
  playerWon,
  levelScore,
  totalScore,
  lifes,
  restart,
  nextLevel,
}) => {
  return (
    <Modal animationType='slide' visible={visible} style={styles.container}>
      <Top score={totalScore} lifes={lifes} />
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>
            {playerWon ? MESSAGES.levelWin : MESSAGES.levelLose}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            {MESSAGES.levelScore}: {levelScore}
          </Text>
          <Text style={styles.stats}>
            {MESSAGES.totalScore}: {totalScore}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          {playerWon ? (
            <Button text={BUTTONS.nextLevel} onPress={nextLevel} />
          ) : (
            <Button text={BUTTONS.reset} onPress={restart} />
          )}
        </View>
        <View style={styles.bottom}>
          <Button text={BUTTONS.items} onPress={() => {}} />
          <Button text={BUTTONS.menu} onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  resultContainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
  },
  statsContainer: {
    flex: 2,
  },
  stats: {
    fontSize: 30,
  },
  actionContainer: {
    flex: 2,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default EndLevelModal;
