import { View, StyleSheet, Text } from 'react-native';

interface IProps {
  score: number;
  lifes: number;
}

const Top: React.FC<IProps> = ({score, lifes}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>Pontos: {score}</Text>
      <Text style={styles.display}>Vidas: {lifes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  display: {
    fontSize: 20,
  }
});

export default Top;
