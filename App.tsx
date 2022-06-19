import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level from './src/components/level/Level';
import MenuModal from './src/components/menu/MenuModal';
import Top from './src/components/top/Top';

const App = () => {
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(3);

  const handleScore = (amount: number) => {
    setScore(score + amount);
  };

  const handleLifes = (amount: number) => {
    setLifes(lifes + amount)
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Top score={score} lifes={lifes} />
      <Level
        rows={5}
        cols={5}
        size={5 * 5}
        maxTime={60}
        showMenu={setShowMenuModal}
        setScore={handleScore}
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
