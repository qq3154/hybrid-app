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
          //console.log(_array);
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
        () => sqlFetchData()
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
      tx.executeSql("DELETE FROM trips WHERE id = ? ", [id], () =>
        sqlFetchData()
      );
    });
  };

  const sqlDeleteAllTrips = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM trips", [], () => sqlFetchData());
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
        <View style={styles.sectionTilte}>
          <Text style={styles.tilte}>ALL TRIPS</Text>
          <Button
            style={styles.btnDelete}
            color="#ff5c5c"
            title=" Delete All"
            onPress={() => sqlDeleteAllTrips()}
          ></Button>
        </View>

        <View style={styles.itemsContainer}>
          <FlatList
            style={styles.items}
            keyExtractor={(item) => item.id}
            data={trip}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPressEdit(item)}>
                <Task
                  onPress={() => console.log("click")}
                  id={index + 1}
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

      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.roundBtn}
        >
          <Text style={styles.roundBtnText}>+</Text>
        </TouchableOpacity>
      </View>

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
        deleteTrip={sqlDeleteTrip}
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
    height: "85%",
  },

  sectionTilte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  tilte: {
    fontSize: 24,
    fontWeight: "bold",
  },

  itemsContainer: {
    height: "90%",
    backgroundColor: "#e0dce3",
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 10,
  },
  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  roundBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#8ae392",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 17,
  },
  roundBtnText: {
    fontSize: 26,
  },
});
