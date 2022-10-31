import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Task from "./Components/Task";
import AddTrip from "./Components/AddTrip";
import EditTrip from "./Components/EditTrip";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.testDb"); // returns Database object

export default function App() {
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    sqlCreateTable();
    sqlFetchData();
  }, []);

  const sqlCreateTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, date TEXT, risk INT, description TEXT)"
      );
    });
  };

  const sqlFetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM trips",
        null,
        (txObj, { rows: { _array } }) => {
          setTrip(_array);
          console.log(_array);
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  };

  const sqlAddTrip = (name, destination, date, risk, description) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO trips (name, destination, date, risk, description) values (?, ?, ?, ?, ?)",
        [name, destination, date, risk, description],
        () => fetchData(),
        (txObj, error) => console.log("Error", error)
      );
    });
  };

  const sqlUpdateTrip = (id, name, destination, date, risk, description) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE trips SET name = ?, destination = ?, date = ?, risk = ?, description = ? WHERE id = ?",
        [name, destination, date, risk, description, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            sqlFetchData();
          }
        }
      );
    });
  };

  const sqlDeleteTrip = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM trips WHERE id = ? ", [id], () => fetchData());
    });
  };

  const sqlDeleteAllTrips = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM trips", [], () => fetchData());
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTrip, setCurrentTrip] = useState({});

  const onPressEdit = (item) => {
    setCurrentTrip(item);
    setIsEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWraper}>
        <Text style={styles.sectionTilte}>ALL TRIPS</Text>

        <View style={styles.itemsContainer}>
          <FlatList
            style={styles.items}
            keyExtractor={(item, index) => item.id}
            data={trip}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onPressEdit(item)}>
                <Task
                  onPress={() => console.log("click")}
                  id={item.id}
                  name={item.name}
                  destination={item.destination}
                  date={item.date}
                  riskAssessment={item.risk}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <Button
        title="Add for test"
        onPress={() =>
          sqlAddTrip(
            "Summer Vacation",
            "Da Nang",
            "2022-10-12",
            1,
            "description ne"
          )
        }
      ></Button>

      <Button title="Delete All" onPress={sqlDeleteAllTrips}></Button>

      <Button title="Add" onPress={() => setIsModalVisible(true)}></Button>

      <AddTrip
        isModalVisible={isModalVisible}
        setIsModalVisible={() => setIsModalVisible(false)}
        addTrip={sqlAddTrip}
      />

      <EditTrip
        isModalVisible={isEditModalVisible}
        setIsModalVisible={() => setIsEditModalVisible(false)}
        trip={currentTrip}
        updateTrip={sqlUpdateTrip}
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
    height: "80%",
  },

  sectionTilte: {
    fontSize: 24,
    fontWeight: "bold",
  },

  itemsContainer: {
    height: "90%",
  },
  items: {
    marginTop: 10,
  },
});
