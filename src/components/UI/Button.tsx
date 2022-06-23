import { Pressable, Text, StyleSheet } from 'react-native';

interface IProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({ text, disabled, onPress }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled === true ? styles.disabled : {}]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#222',
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  disabled: {
    backgroundColor: '#222',
  },
});
