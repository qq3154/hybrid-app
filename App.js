import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, Modal, StyleSheet, Text, View, FlatList } from "react-native";

import Task from "./Components/Task";

export default function App() {
  const [trip, setTrip] = useState([]);

  const addTrip = () => {
    setTrip((trip) => [
      ...trip,
      {
        tripId: "square1",
        tripName: "deeppink1",
        tripDate: 5,
      },
    ]);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.taskWraper}>
        <Text style={styles.sectionTilte}>Today's tasks</Text>

        <FlatList
          style={styles.items}
          keyExtractor={(item, index) => item.tripId}
          data={trip}
          renderItem={({ item }) => <Task text={item.tripDate} />}
        />
      </View>

      <Button title="Add" onPress={addTrip}></Button>

      <Button title="asd" onPress={() => setIsModalVisible(true)}></Button>
      <Modal style={styles.modal} visible={isModalVisible}>
        <View>
          <Text>adasdasd</Text>
          <Text>adasdasd</Text>
          <Text>adasdasd</Text>
          <Text>adasdasd</Text>
        </View>
        <Button title="Close" onPress={() => setIsModalVisible(false)}></Button>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWraper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTilte: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
});
