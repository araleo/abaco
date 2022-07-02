import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../util/colors';

interface IProps {
  text: string;
  disabled?: boolean;
  small?: boolean;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({ text, disabled, small, onPress }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        small === true ? styles.small : {},
        disabled === true ? styles.disabled : {},
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 200,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: COLORS.darkestGrey,
    borderRadius: 20,
  },
  small: {
    width: 100,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: COLORS.darkestGrey,
  },
});
