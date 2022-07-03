import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Level, { ILevelData } from './src/components/level/Level';
import MenuModal from './src/components/menus/MenuModal';
import Top from './src/components/UI/Top';
import { BASE_LIFES } from './src/util/constants';
import { COLORS } from './src/util/colors';
import EndScreen from './src/components/endscreen/EndScreen';
import { MESSAGES } from './src/util/texts';
import EndLevelModal from './src/components/menus/EndLevelModal';
import ItemsModal, { IItem } from './src/components/menus/ItemsModal';
import levelData from './assets/levels/levels.json';
import itemsData from './assets/items/items.json';

const App = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(true);
  const [showItemsModal, setShowItemsModal] = useState<boolean>(false);
  const [showEndLevelModal, setShowEndLevelModal] = useState<boolean>(false);
  const [lastLevelScore, setLastLevelScore] = useState<number>(0);
  const [levelTries, setLevelTries] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(BASE_LIFES);
  const [scoreMultiplier, setScoreMultiplier] = useState<number>(1);
  const [extraTime, setExtraTime] = useState<number>(0);
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    setItems(itemsData);
  }, []);

  useEffect(() => {
    setScore(score + lastLevelScore * scoreMultiplier);
    if (start) {
      handleEndLevel();
    }
  }, [lastLevelScore]);

  const handleStart = () => {
    setIsComplete(false);
    setShowMenuModal(false);
    setStart(true);
    setPause(false);
    setScore(0);
    setLevel(0);
    setLifes(BASE_LIFES);
  };

  const handleNextLevel = () => {
    if (lastLevelScore > 0) {
      if (level < levelData.length - 1) {
        setLevel(level + 1);
        setLevelTries(0);
        if (scoreMultiplier !== 1) {
          resetExtraScoreItem();
        }
      } else {
        setIsComplete(true);
      }
    }
    setShowEndLevelModal(false);
    setPause(false);
  };

  const handleRestartLevel = () => {
    setLevelTries(levelTries + 1);
    setShowEndLevelModal(false);
    setPause(false);
  };

  const handleEndLevel = () => {
    resetExtraTimeItem();
    resetExtraLifeItem();
    setPause(true);
    setShowEndLevelModal(true);
  };

  const handleOpenPauseMenu = () => {
    setPause(true);
    setShowMenuModal(true);
  };

  const handleClosePauseMenu = () => {
    setShowMenuModal(false);
    setPause(false);
  };

  const handleOpenItemsMenu = () => {
    setPause(true);
    setShowItemsModal(true);
  };

  const handleCloseItemsMenu = () => {
    setShowItemsModal(false);
    setPause(false);
  };

  const handleLifes = (amount: number) => {
    setLifes(lifes + amount);
  };

  const handleItem = (item: IItem) => {
    setScore(score - item.cost);
    updateItem(item);
    if (item.name === 'extraLife') {
      setLifes(lifes + 1);
    } else if (item.name === 'extraScore') {
      setScoreMultiplier(2);
    } else if (item.name === 'extraTime') {
      setExtraTime(20);
    }
  };

  const updateItem = (item: IItem) => {
    const _items: IItem[] = [];
    for (const _item of items) {
      const newItem = { ..._item };
      if (newItem.id === item.id) {
        newItem.available = !newItem.available;
      }
      _items.push(newItem);
    }
    setItems(_items);
  };

  const findItem = (itemName: string) => {
    return items.find((item) => item.name === itemName);
  };

  const resetExtraScoreItem = () => {
    setScoreMultiplier(1);
    const extraScoreItem = findItem('extraScore');
    if (extraScoreItem) {
      updateItem(extraScoreItem);
    }
  };

  const resetExtraTimeItem = () => {
    setExtraTime(0);
    const extraTimeItem = findItem('extraTime');
    if (extraTimeItem) {
      updateItem(extraTimeItem);
    }
  };

  const resetExtraLifeItem = () => {
    const extraLifeItem = findItem('extraLife');
    if (extraLifeItem) {
      updateItem(extraLifeItem);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Top score={score} lifes={lifes} />
      {lifes === 0 ? (
        <EndScreen
          text={MESSAGES.gameOver}
          score={score}
          handleRestart={handleStart}
        />
      ) : isComplete ? (
        <EndScreen
          text={MESSAGES.youWin}
          score={score}
          handleRestart={handleStart}
        />
      ) : (
        <Level
          levelData={levelData[level] as ILevelData}
          running={start && !pause}
          tries={levelTries}
          extraTime={extraTime}
          pauseMenu={handleOpenPauseMenu}
          itemsMenu={handleOpenItemsMenu}
          setScore={setLastLevelScore}
          setLifes={handleLifes}
        />
      )}
      <MenuModal
        visible={showMenuModal}
        started={start}
        setModalVisible={setShowMenuModal}
        handleStart={handleStart}
        handlePause={handleClosePauseMenu}
      />
      <EndLevelModal
        visible={showEndLevelModal}
        playerWon={lastLevelScore > 0}
        levelScore={lastLevelScore}
        levelTries={levelTries}
        scoreMultiplier={scoreMultiplier}
        totalScore={score}
        lifes={lifes}
        restart={handleRestartLevel}
        nextLevel={handleNextLevel}
      />
      <ItemsModal
        visible={showItemsModal}
        score={score}
        lifes={lifes}
        items={items}
        handleItem={handleItem}
        closeModal={handleCloseItemsMenu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightestGrey,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default App;
