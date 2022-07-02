import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../util/colors';

interface IProps {}

const TITLE = 'ÁBACO';

const Title: React.FC<IProps> = () => {
  const first = TITLE.charAt(0);
  const mid = TITLE.substring(1, TITLE.length - 1);
  const last = TITLE.charAt(TITLE.length - 1);

  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.detail}>{first}</Text>
        <Text style={styles.text}>{mid}</Text>
        <Text style={styles.detail}>{last}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail: {
    fontSize: 70,
    color: COLORS.detail
  },
  text: {
    fontSize: 70,
    color: COLORS.grey
  }
});

export default Title;
