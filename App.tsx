import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level, { ILevelData } from './src/components/level/Level';
import MenuModal from './src/components/menu/MenuModal';
import Top from './src/components/top/Top';

import levelData from './assets/levels/levels.json';

const App = () => {
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(3);

  const handleScore = (amount: number) => {
    setScore(score + amount);
  };

  const handleLifes = (amount: number) => {
    setLifes(lifes + amount);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Top score={score} lifes={lifes} />
      <Level
        levelData={levelData[0] as ILevelData}
        running={running}
        setRunning={setRunning}
        showMenu={setShowMenuModal}
        setScore={handleScore}
        setLifes={handleLifes}
      />
      <MenuModal visible={showMenuModal} setModalVisible={setShowMenuModal} />
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
