import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { shuffleArray } from '../../util/lib';
import Stopwatch from '../stopwatch/Stopwatch';
import Button from '../UI/Button';

const Level: React.FC<{ rows: number; cols: number; size: number }> = ({
  rows,
  cols,
  size,
}) => {
  const [level, setLevel] = useState<number[][]>([]);
  const [first, setFirst] = useState<number>(0);
  const [last, setLast] = useState<number>(size - 1);
  const [selected, setSelected] = useState<number[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    createLevel();
  }, []);

  useEffect(() => {
    setFirst(0);
    setLast(size - 1);
  }, [level]);

  useEffect(() => {
    setSelected((selected) => [...selected, first]);
  }, [first]);

  useEffect(() => {
    setSelected((selected) => [...selected, last]);
  }, [last]);

  const createLevel = () => {
    const cells = [...Array(size).keys()];
    shuffleArray(cells);
    const newLevel = [];
    for (let row = 0; row < rows; row++) {
      newLevel.push([] as number[]);
      for (let col = 0; col < cols; col++) {
        const nextCell = cells.pop();
        newLevel[row].push(nextCell || 0);
      }
    }
    setLevel(newLevel);
  };

  const handlePress = (cell: number) => {
    if (selected.includes(cell - 1)) {
      setSelected((selected) => [...selected, cell]);
    }
  };

  const handleReset = () => {
    setSelected([first, last]);
    setTime(0);
  };

  const handleNewLevel = () => {
    handleReset();
    createLevel();
  };

  const getBackgroundColor = (cell: number): string => {
    const firstOrLast = cell === first || cell === last;
    return firstOrLast ? 'blue' : selected.includes(cell) ? 'green' : '#777';
  };

  const renderCell = (cell: number): JSX.Element => {
    const backgroundColor = getBackgroundColor(cell);
    return (
      <Pressable
        onPress={() => {
          handlePress(cell);
        }}
        style={[styles.cell, { backgroundColor }]}
      >
        <Text style={styles.cellText}>{cell.toString()}</Text>
      </Pressable>
    );
  };

  const renderLevel = (): JSX.Element => {
    return (
      <View style={styles.level}>
        {level.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View key={cellIndex}>{renderCell(cell)}</View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Frase marotinha com as regras do nível</Text>
      </View>
      <View style={styles.title}>
        <Text>Placeholder para o relogio</Text>
        <Stopwatch count={time} setCount={setTime} />
      </View>
      {renderLevel()}
      <View style={styles.title}>
        <Button text='Reiniciar' onPress={handleReset} />
        <Button text='Novo Nivel' onPress={handleNewLevel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    backgroundColor: '#777',
    borderColor: 'black',
    width: 75,
    height: 75,
  },
  cellText: {
    fontSize: 22,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Level;
