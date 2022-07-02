import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../util/colors';
import { BUTTONS, LABELS, MESSAGES } from '../../util/texts';
import Top from '../UI/Top';
import Button from '../UI/Button';

export interface IItem {
  id: number;
  name: string;
  prettyName: string;
  tooltip: string;
  cost: number;
  available: boolean;
}

interface IProps {
  visible: boolean;
  score: number;
  lifes: number;
  items: IItem[];
  handleItem: (item: IItem) => void;
  closeModal: () => void;
}

const ItemsModal: React.FC<IProps> = ({
  visible,
  score,
  lifes,
  items,
  handleItem,
  closeModal,
}) => {
  const [error, setError] = useState<string>('');

  const canBuyItem = (item: IItem): boolean => {
    return item.available && score >= item.cost;
  };

  const handleItemClick = (item: IItem) => {
    if (canBuyItem(item)) {
      handleItem(item);
    }
    setError('');
  };

  const handleItemPressIn = (item: IItem) => {
    if (!item.available) {
      setError(MESSAGES.itemNotAvailable);
    } else if (item.cost > score) {
      setError(MESSAGES.notEnoughFunds);
    }
  };

  const itemsList = (): JSX.Element => {
    return (
      <>
        {items.map((item) => {
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? canBuyItem(item)
                      ? COLORS.detail
                      : COLORS.error
                    : 'white',
                },
                styles.itemContainer,
              ]}
              key={item.id}
              onPressIn={() => handleItemPressIn(item)}
              onPress={() => handleItemClick(item)}
            >
              <Text style={styles.itemName}>{item.prettyName}</Text>
              <Text style={styles.itemDescription}>{item.tooltip}</Text>
              <Text style={styles.itemCost}>
                {LABELS.cost}: {item.cost} {LABELS.score.toLowerCase()}
              </Text>
            </Pressable>
          );
        })}
      </>
    );
  };

  return (
    <Modal animationType='slide' visible={visible}>
      <Top score={score} lifes={lifes} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{MESSAGES.itemsTitle}</Text>
          <Text style={styles.description}>{MESSAGES.itemsDescription}</Text>
        </View>
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.itemsContainer}>{itemsList()}</View>
        <View style={styles.buttonsContainer}>
          <Button text={BUTTONS.close} onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    textAlign: 'justify',
  },
  itemsContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
  },
  itemDescription: {
    fontSize: 18,
    marginBottom: 12,
  },
  itemCost: {
    fontSize: 14,
    textAlign: 'right',
  },
  errorContainer: {
    borderWidth: 2,
    borderColor: COLORS.error,
    borderRadius: 15,
    padding: 15,
    marginBottom: 24,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
});

export default ItemsModal;
