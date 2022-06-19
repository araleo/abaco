import { View, Text, StyleSheet } from 'react-native';
import useInterval from '../../util/use-interval';

interface IProps {
  count: number;
  setCount: (count: number) => void;
}

const Stopwatch: React.FC<IProps> = ({ count, setCount }) => {
  useInterval(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, 1000);

  return (
    <View>
      <Text style={styles.display}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    fontSize: 40,
  },
});

export default Stopwatch;
