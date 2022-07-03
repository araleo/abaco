import { Modal, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../util/colors';
import { BUTTONS, LABELS, MESSAGES } from '../../util/texts';
import Top from '../UI/Top';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  playerWon: boolean;
  levelScore: number;
  levelTries: number;
  scoreMultiplier: number;
  totalScore: number;
  lifes: number;
  restart: () => void;
  nextLevel: () => void;
}

const StatsView: React.FC = ({ children }) => {
  return <View style={styles.stats}>{children}</View>;
};

const StatsText: React.FC<{ text: string | number; color?: string }> = ({
  text,
  color,
}) => {
  return (
    <Text
      style={[
        styles.statsText,
        color ? { color: color } : {},
        typeof text === 'number' ? { fontWeight: 'bold' } : {},
      ]}
    >
      {text}
    </Text>
  );
};

const EndLevelModal: React.FC<IProps> = ({
  visible,
  playerWon,
  levelScore,
  levelTries,
  scoreMultiplier,
  totalScore,
  lifes,
  restart,
  nextLevel,
}) => {
  return (
    <Modal animationType='slide' visible={visible}>
      <Top score={totalScore} lifes={lifes} />

      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>
            {playerWon ? MESSAGES.levelWin : MESSAGES.levelLose}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>{MESSAGES.score}</Text>

          <StatsView>
            <StatsText text={LABELS.previousScore} />
            <StatsText text={totalScore - levelScore} />
          </StatsView>
          <StatsView>
            <StatsText text={LABELS.currentLevel} color={COLORS.success} />
            <StatsText text={'+ ' + levelScore} color={COLORS.success} />
          </StatsView>
          <StatsView>
            <StatsText text={LABELS.multiplier} color={COLORS.detail} />
            <StatsText text={'* ' + scoreMultiplier} color={COLORS.detail} />
          </StatsView>
          <StatsView>
            <StatsText text={LABELS.penalties} color={COLORS.error} />
            <StatsText text={'- ' + levelTries * 10} color={COLORS.error} />
          </StatsView>
          <StatsView>
            <StatsText text={LABELS.totalScore} />
            <StatsText text={totalScore} />
          </StatsView>
        </View>

        <View style={styles.actionsContainer}>
          {playerWon ? (
            <Button text={BUTTONS.nextLevel} onPress={nextLevel} />
          ) : (
            <Button text={BUTTONS.reset} onPress={restart} />
          )}
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
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 40,
  },
  statsContainer: {
    flex: 3,
    justifyContent: 'center',
    width: '70%',
  },
  statsTitle: {
    fontSize: 30,
    marginBottom: 32,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 20,
  },
  actionsContainer: {
    flex: 2,
    justifyContent: 'flex-start',
  },
});

export default EndLevelModal;
