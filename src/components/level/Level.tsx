import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../util/colors';
import { shuffleArray } from '../../util/lib';
import { BUTTONS } from '../../util/texts';
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
  tries: number;
  setPause: (run: boolean) => void;
  setScore: (score: number) => void;
  setLifes: (lifes: number) => void;
  showMenu: () => void;
  endLevel: () => void;
}

const Level: React.FC<IProps> = ({
  levelData,
  running,
  tries,
  setPause,
  setScore,
  setLifes,
  showMenu,
  endLevel,
}) => {
  const [level, setLevel] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [time, setTime] = useState<number>(levelData.baseTime);

  useEffect(() => {
    createLevel();
  }, [levelData]);

  useEffect(() => {
    resetLevel();
  }, [level, tries]);

  useEffect(() => {
    if (selected.length === levelData.solution.length) {
      setScore(time);
      endLevel();
    }
  }, [selected]);

  useEffect(() => {
    if (time <= 0) {
      setScore(0);
      setLifes(-1);
      endLevel();
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

  const resetLevel = () => {
    setSelected([levelData.first, levelData.last]);
    setTime(levelData.baseTime);
  };

  const handleReset = () => {
    resetLevel();
    setPause(false);
  };

  const getCellBackgroundColor = (cell: number): string => {
    return cell === levelData.first || cell === levelData.last
      ? COLORS.detail
      : selected.includes(cell)
      ? COLORS.success
      : COLORS.lightGrey;
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
        ) : (
          <Text>{time}</Text>
        )}
      </View>
      {renderLevel()}
      <View style={styles.buttons}>
        <Button text={BUTTONS.reset} onPress={handleReset} />
        <Button text={BUTTONS.menu} onPress={showMenu} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    backgroundColor: COLORS.lightGrey,
    borderColor: 'black',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-around',
    width: '100%',
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
