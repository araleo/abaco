import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  setModalVisible: (show: boolean) => void;
  handleStart: () => void;
}

const MenuModal: React.FC<IProps> = ({
  visible,
  setModalVisible,
  handleStart,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      style={styles.container}
    >
      <View style={styles.container}>
        <View>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aut
            iusto ad quae ea! Soluta non laudantium ad laborum deleniti
            voluptatum, voluptatibus quam quisquam itaque id, quasi illo odit
            ex.
          </Text>
        </View>
        <View style={styles.button}>
          <Button text='Iniciar' onPress={() => setModalVisible(false)} />
        </View>
        <View style={styles.button}>
          <Button text='Resetar' onPress={handleStart} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 16,
    borderColor: 'black',
  },
});

export default MenuModal;
