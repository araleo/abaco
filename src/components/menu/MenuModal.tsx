import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

interface IProps {
  visible: boolean;
  setModalVisible: (show: boolean) => void;
}

const MenuModal: React.FC<IProps> = ({ visible, setModalVisible }) => {
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
        <Pressable onPress={() => setModalVisible(false)}>
          <Text>Iniciar</Text>
        </Pressable>
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
});

export default MenuModal;
