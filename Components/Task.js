import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

const Task = (props) => {
  let riskAssment = "";
  if (props.riskAssessment === 0) {
    riskAssment = "No";
  } else {
    riskAssment = "Yes";
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
        <Text style={styles.itemText2}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View> */}
      <View style={styles.box1}>
        <Text style={styles.textId}>{props.id}</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.textInfo}>{props.name}</Text>
        <Text style={styles.textSubInfo}>{props.destination}</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.textInfo}>{props.date}</Text>
        <Text style={styles.textSubInfo}>Risk Assessment: {riskAssment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    height: 80,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  box1: {
    width: "16%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    width: "42%",
    height: "100%",
  },
  box3: {
    width: "42%",
    height: "100%",
    paddingLeft: 20,
  },
  textId: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: 16,
    height: "60%",
    paddingTop: 5,
  },

  textSubInfo: {
    fontSize: 11,
    height: "22%",
    marginTop: 5,
    color: "#3e3e3e",
  },
});

export default Task;
