import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, View, FlatList } from "react-native";

import Task from "./Components/Task";
import AddTrip from "./Components/AddTrip";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.testDb"); // returns Database object

export default function App() {
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    createTable();
    fetchData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)"
      );
    });
  };

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        null,
        (txObj, { rows: { _array } }) => {
          setTrip(_array);
          console.log(_array);
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  };

  const insertItem = (text, count) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO items (text, count) values (?, ?)",
        [text, count],
        () => fetchData(),
        (txObj, error) => console.log("Error", error)
      );
    });
  };

  const updateItem = (id, count) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE items SET count = ? WHERE id = ?",
        [count, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            fetchData();
          }
        }
      );
    });
  };

  const deleteItem = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM items WHERE id = ? ", [id], () => fetchData());
    });
  };

  const deleteAllItems = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM items", [], () => fetchData());
    });
  };

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
          keyExtractor={(item, index) => item.id}
          data={trip}
          renderItem={({ item }) => <Task text={item.count} />}
        />
      </View>

      <Button title="Add" onPress={() => insertItem("qq", 3)}></Button>

      <Button title="update" onPress={() => updateItem(9, 2)}></Button>

      <Button title="delete" onPress={() => deleteItem(2)}></Button>

      <Button title="Delete All" onPress={deleteAllItems}></Button>

      <Button title="Add" onPress={() => setIsModalVisible(true)}></Button>

      <AddTrip
        isModalVisible={isModalVisible}
        setIsModalVisible={() => setIsModalVisible(false)}
        addTrip={insertItem}
      />
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
