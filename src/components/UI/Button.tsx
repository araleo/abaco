import { Pressable, Text, StyleSheet } from 'react-native';

interface IProps {
  text: string;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
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
    fontSize: 20
  },
});
