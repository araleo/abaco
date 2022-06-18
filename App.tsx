import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level from './src/components/level/Level';
import MenuModal from './src/components/menu/MenuModal';

const App = () => {
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      {!showMenuModal && <Level rows={5} cols={5} size={5 * 5} />}
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
