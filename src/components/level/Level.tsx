import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { shuffleArray } from '../../util/lib';
import Stopwatch from '../stopwatch/Stopwatch';
import Button from '../UI/Button';

export interface ILevelData {
  id: number;
  name: string;
  tooltip: string;
  rows: number;
  cols: number;
  size: number;
  baseTime: number;
  data: number[];
  solution: number[];
  first: number;
  last: number;
  shuffle: boolean;
}

interface IProps {
  levelData: ILevelData;
  running: boolean;
  setPause: (run: boolean) => void;
  setScore: (score: number) => void;
  setLifes: (lifes: number) => void;
  showMenu: () => void;
  nextLevel: () => void;
}

const Level: React.FC<IProps> = ({
  levelData,
  running,
  setPause,
  setScore,
  setLifes,
  showMenu,
  nextLevel,
}) => {
  const [level, setLevel] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [time, setTime] = useState<number>(levelData.baseTime);
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    createLevel();
  }, [levelData]);

  useEffect(() => {
    handleReset();
  }, [level]);

  useEffect(() => {
    if (selected.length === levelData.solution.length) {
      setScore(time);
      setWin(true);
      setPause(true);
    }
  }, [selected]);

  useEffect(() => {
    if (time <= 0) {
      setPause(true);
      setLifes(-1);
    }
  }, [time]);

  const createLevel = () => {
    const cells = levelData.shuffle
      ? shuffleArray(levelData.data)
      : [...levelData.data];
    const newLevel = [];
    for (let row = 0; row < levelData.rows; row++) {
      newLevel.push([] as number[]);
      for (let col = 0; col < levelData.cols; col++) {
        const nextCell = cells.pop();
        newLevel[row].push(nextCell || 0);
      }
    }
    setLevel(newLevel);
  };

  const handlePress = (cell: number) => {
    if (running && selected.includes(cell - 1)) {
      setSelected((selected) => [...selected, cell]);
    }
  };

  const handleReset = () => {
    setWin(false);
    setSelected([levelData.first, levelData.last]);
    setTime(levelData.baseTime);
    // setRunning(true);
  };

  const handleNextLevel = () => {
    nextLevel();
    setPause(false);
  };

  const getCellBackgroundColor = (cell: number): string => {
    const firstOrLast = cell === levelData.first || cell === levelData.last;
    return firstOrLast ? 'blue' : selected.includes(cell) ? 'green' : '#777';
  };

  const renderCell = (cell: number): JSX.Element => {
    const backgroundColor = getCellBackgroundColor(cell);
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
        <Text style={styles.tooltip}>{levelData.tooltip}</Text>
      </View>
      <View style={styles.title}>
        {running === true ? (
          <Stopwatch count={time} setCount={setTime} />
        ) : win ? (
          <Text>Ganhou !!!!!</Text>
        ) : (
          <Text>Perdeu!!!!</Text>
        )}
      </View>
      {renderLevel()}
      <View style={styles.buttons}>
        <Button text='Reiniciar' onPress={handleReset} />
        <Button text='Novo Nivel' onPress={handleNextLevel} disabled={!win} />
        <Button text='Menu' onPress={showMenu} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
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
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    fontSize: 18,
  },
});

export default Level;
