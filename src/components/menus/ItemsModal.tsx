import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { BUTTONS, LABELS, MESSAGES } from '../../util/texts';
import Top from '../top/Top';
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
  const handleItemClick = (item: IItem) => {
    if (!item.available || score < item.cost) {
      return;
    }
    handleItem(item);
  };

  return (
    <Modal animationType='slide' visible={visible} style={styles.container}>
      <Top score={score} lifes={lifes} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{MESSAGES.items}</Text>
        </View>

        <View style={styles.itemsContainer}>
          {items.map((item) => {
            return (
              <Pressable
                style={styles.itemContainer}
                key={item.id}
                onPress={() => handleItemClick(item)}
              >
                <Text style={styles.itemName}>{item.prettyName}</Text>
                <Text>{item.tooltip}</Text>
                <Text>
                  {LABELS.cost}: {item.cost} {LABELS.score.toLowerCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>



        <View>
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
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
  },
  itemsContainer: {
    flex: 4,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 20,
  },
});

export default ItemsModal;
