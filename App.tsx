import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level, { ILevelData } from './src/components/level/Level';
import MenuModal from './src/components/menu/MenuModal';
import Top from './src/components/top/Top';

import levelData from './assets/levels/levels.json';

const App = () => {
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(3);
  const [level, setLevel] = useState<number>(0);

  const handleScore = (amount: number) => {
    setScore(score + amount);
  };

  const handleLifes = (amount: number) => {
    setLifes(lifes + amount);
  };

  const handleStart = () => {
    setShowMenuModal(false);
    setLevel(0);
    setStart(true);
    setPause(false);
  };

  const handleNextLevel = () => {
    if (level < levelData.length - 1) {
      setLevel(level + 1);
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
      <Level
        levelData={levelData[level] as ILevelData}
        running={start && !pause}
        setPause={setPause}
        showMenu={handleOpenPauseMenu}
        setScore={handleScore}
        setLifes={handleLifes}
        nextLevel={handleNextLevel}
      />
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
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
