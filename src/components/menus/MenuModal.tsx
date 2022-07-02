import { Modal, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../util/colors';
import { BUTTONS, LOREM } from '../../util/texts';
import Button from '../UI/Button';
import Title from '../UI/Title';

interface IProps {
  visible: boolean;
  started: boolean;
  setModalVisible: (show: boolean) => void;
  handleStart: () => void;
  handlePause: () => void;
}

const MenuModal: React.FC<IProps> = ({
  visible,
  started,
  handleStart,
  handlePause,
}) => {
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title />
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{LOREM}</Text>
        </View>
        <View style={styles.buttons}>
          {started && (
            <View style={styles.button}>
              <Button text={BUTTONS.continue} onPress={handlePause} />
            </View>
          )}
          <View style={styles.button}>
            <Button
              text={started ? BUTTONS.reset : BUTTONS.start}
              onPress={handleStart}
            />
          </View>
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
    width: '100%',
  },
  title: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  descriptionText: {
    textAlign: 'justify',
  },
  buttons: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 32,
  },
});

export default MenuModal;
