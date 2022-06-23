import { Modal, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../util/colors';
import { BUTTONS, LOREM } from '../../util/texts';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  setModalVisible: (show: boolean) => void;
  handleStart: () => void;
  handlePause: () => void;
}

const MenuModal: React.FC<IProps> = ({ visible, handleStart, handlePause }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      style={styles.container}
    >
      <View style={styles.container}>
        <View>
          <Text>{LOREM}</Text>
        </View>
        <View style={styles.button}>
          <Button text={BUTTONS.start} onPress={handleStart} />
        </View>
        <View style={styles.button}>
          <Button text={BUTTONS.continue} onPress={handlePause} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightestGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 16,
    borderColor: 'black',
  },
});

export default MenuModal;
