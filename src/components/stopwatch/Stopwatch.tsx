import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import useInterval from '../../util/use-interval';

interface IProps {
  count: number;
  setCount: (count: number) => void;
}

const Stopwatch: React.FC<IProps> = ({ count, setCount }) => {
  const [running, setRunning] = useState<boolean>(false);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};

export default Stopwatch;
