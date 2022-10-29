import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

const AddTrip = (props) => {
  const add = () => {
    console.log("back with change");
    props.addTrip("a", 2);
    props.setIsModalVisible();
  };

  return (
    <Modal style={styles.container} visible={props.isModalVisible}>
      <View style={styles.form}>
        <Text>adasdasd</Text>
      </View>
      <Button title="Back" onPress={props.setIsModalVisible}></Button>
      <Button title="Add" onPress={add}></Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 30,
    margin: 50,
  },
  form: {
    flex: 1,
    backgroundColor: "yellow",
    margin: 10,
  },
});

export default AddTrip;
