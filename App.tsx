import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level, { ILevelData } from './src/components/level/Level';
import MenuModal from './src/components/menu/MenuModal';
import Top from './src/components/top/Top';
import { BASE_LIFES } from './src/util/constants';
import { COLORS } from './src/util/colors';
import EndScreen from './src/components/endscreen/EndScreen';
import { MESSAGES } from './src/util/texts';
import levelData from './assets/levels/levels.json';

const App = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(BASE_LIFES);

  const handleScore = (amount: number) => {
    setScore(score + amount);
  };

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
    if (level < levelData.length - 1) {
      setLevel(level + 1);
    } else {
      setIsComplete(true);
    }
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
          setPause={setPause}
          showMenu={handleOpenPauseMenu}
          setScore={handleScore}
          setLifes={handleLifes}
          nextLevel={handleNextLevel}
        />
      )}
      <MenuModal
        visible={showMenuModal}
        setModalVisible={setShowMenuModal}
        handleStart={handleStart}
        handlePause={handleClosePauseMenu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
