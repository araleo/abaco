import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../util/colors';
import { compareArrays, shuffleArray } from '../../util/lib';
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
  baseScore: number;
  data: number[];
  solution: number[];
  first: number;
  last: number;
  shuffle: boolean;
  memory: null | number;
}

interface IProps {
  levelData: ILevelData;
  running: boolean;
  tries: number;
  extraTime: number;
  setScore: (score: number) => void;
  setLifes: (lifes: number) => void;
  pauseMenu: () => void;
  itemsMenu: () => void;
  endLevel: () => void;
}

const Level: React.FC<IProps> = ({
  levelData,
  running,
  tries,
  extraTime,
  setScore,
  setLifes,
  pauseMenu,
  itemsMenu,
  endLevel,
}) => {
  const [level, setLevel] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [time, setTime] = useState<number>(levelData.baseTime + extraTime);
  const [renderCellText, setRenderCellText] = useState<boolean>(true);
  const [nextCell, setNextCell] = useState<number>(0);

  useEffect(() => {
    createLevel();
  }, [levelData]);

  useEffect(() => {
    resetLevel();
  }, [level, tries]);

  useEffect(() => {
    setTime(time + extraTime);
  }, [extraTime]);

  useEffect(() => {
    if (compareArrays(levelData.solution, selected)) {
      const levelScore = Math.max(time + levelData.baseScore - tries * 10, 0);
      setScore(levelScore);
    } else {
      handleNextCell();
    }
  }, [selected]);

  useEffect(() => {
    const memory = levelData.memory;
    if (
      memory !== null &&
      time < levelData.baseTime + extraTime &&
      time % memory === 0
    ) {
      setRenderCellText(!renderCellText);
    }

    if (time <= 0) {
      setScore(0);
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
        const cell = cells.pop();
        newLevel[row].push(cell || 0);
      }
    }
    setLevel(newLevel);
  };

  const handleNextCell = () => {
    if (selected.length < 1) return;
    const current = selected[selected.length - 1];
    const currentIndexInSolution = levelData.solution.indexOf(current);
    const next = levelData.solution[currentIndexInSolution + 1];
    setNextCell(next);
  };

  const handlePress = (cell: number) => {
    if (running && cell === nextCell) {
      setSelected((selected) => [...selected, cell]);
    }
  };

  const resetLevel = () => {
    setRenderCellText(true);
    setSelected([levelData.first]);
    setTime(levelData.baseTime + extraTime);
  };

  const getCellBackgroundColor = (cell: number): string => {
    if (cell === levelData.first) {
      return COLORS.detail;
    } else if (cell === levelData.last && selected.includes(cell)) {
      return COLORS.detail;
    } else if (selected.includes(cell)) {
      return COLORS.success;
    } else {
      return COLORS.lightGrey;
    }
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
        {renderCellText && (
          <Text style={styles.cellText}>{cell.toString()}</Text>
        )}
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
        <Button text={BUTTONS.items} onPress={itemsMenu} small={true} />
        <Button text={BUTTONS.menu} onPress={pauseMenu} small={true} />
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
    fontWeight: 'bold',
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
    fontSize: 24,
  },
});

export default Level;
