import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level, { ILevelData } from './src/components/level/Level';
import MenuModal from './src/components/menus/MenuModal';
import Top from './src/components/top/Top';
import { BASE_LIFES } from './src/util/constants';
import { COLORS } from './src/util/colors';
import EndScreen from './src/components/endscreen/EndScreen';
import { MESSAGES } from './src/util/texts';
import levelData from './assets/levels/levels.json';
import EndLevelModal from './src/components/menus/EndLevelModal';

const App = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [showEndLevelModal, setShowEndLevelModal] = useState<boolean>(false);
  const [lastLevelScore, setLastLevelScore] = useState<number>(0);
  const [levelTries, setLevelTries] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(BASE_LIFES);

  useEffect(() => {
    setScore(score + lastLevelScore);
  }, [lastLevelScore]);

  const handleLifes = (amount: number) => {
    setLifes(lifes + amount);
  };

  const handleStart = () => {
    setIsComplete(false);
    setShowMenuModal(false);
    setStart(true);
    setPause(false);
    setScore(0);
    setLevel(0);
    setLifes(BASE_LIFES);
  };

  const handleNextLevel = () => {
    if (lastLevelScore > 0) {
      if (level < levelData.length - 1) {
        setLevel(level + 1);
      } else {
        setIsComplete(true);
      }
    }
    setShowEndLevelModal(false);
    setPause(false);
  };

  const handleRestartLevel = () => {
    setLevelTries(levelTries + 1);
    setShowEndLevelModal(false);
    setPause(false);
  };

  const handleEndLevel = () => {
    setPause(true);
    setShowEndLevelModal(true);
  };

  const handleOpenPauseMenu = () => {
    setPause(true);
    setShowMenuModal(true);
  };

  const handleClosePauseMenu = () => {
    setShowMenuModal(false);
    setPause(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Top score={score} lifes={lifes} />
      {lifes === 0 ? (
        <EndScreen
          text={MESSAGES.gameOver}
          score={score}
          handleRestart={handleStart}
        />
      ) : isComplete ? (
        <EndScreen
          text={MESSAGES.youWin}
          score={score}
          handleRestart={handleStart}
        />
      ) : (
        <Level
          levelData={levelData[level] as ILevelData}
          running={start && !pause}
          tries={levelTries}
          setPause={setPause}
          showMenu={handleOpenPauseMenu}
          setScore={setLastLevelScore}
          setLifes={handleLifes}
          endLevel={handleEndLevel}
        />
      )}
      <MenuModal
        visible={showMenuModal}
        started={start}
        setModalVisible={setShowMenuModal}
        handleStart={handleStart}
        handlePause={handleClosePauseMenu}
      />
      <EndLevelModal
        visible={showEndLevelModal}
        playerWon={lastLevelScore > 0}
        levelScore={lastLevelScore}
        totalScore={score}
        lifes={lifes}
        restart={handleRestartLevel}
        nextLevel={handleNextLevel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightestGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
