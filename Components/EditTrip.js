// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

// const EditTrip = (props) => {
//   const add = () => {
//     console.log("back with change");
//     props.addTrip("a", 2);
//     props.setIsModalVisible();
//   };

//   return (
//     <Modal style={styles.container} visible={props.isModalVisible}>
//       <View style={styles.form}>
//         <Text>adasdasd</Text>
//         <TextInput>asd</TextInput>
//       </View>
//       <Button title="Back" onPress={props.setIsModalVisible}></Button>
//       <Button title="Add" onPress={add}></Button>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     padding: 30,
//     margin: 50,
//   },
//   form: {
//     flex: 1,
//     backgroundColor: "yellow",
//     margin: 10,
//   },
// });

// export default EditTrip;

// Formik x React Native example
import React from "react";
import { StyleSheet, Modal, Button, TextInput, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

const EditTrip = (props) => {
  const onSubmit = (values) => {
    console.log(values);

    props.updateTrip(
      values.id,
      values.name,
      values.destination,
      values.date,
      1,
      values.description
    );
    props.setIsModalVisible();
  };

  return (
    <Modal style={styles.container} visible={props.isModalVisible}>
      <Formik
        initialValues={props.trip}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Trip Name:</Text>
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Enter trip name"
            />

            <Text>Trip Destination:</Text>
            <TextInput
              onChangeText={handleChange("destination")}
              onBlur={handleBlur("destination")}
              value={values.destination}
              placeholder="Enter trip destination"
            />

            <Text>Trip Date:</Text>
            <TextInput
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              value={values.date}
              placeholder="Enter trip date"
            />

            <Text>Trip Risk Assessment:</Text>
            <TextInput
              onChangeText={handleChange("risk")}
              onBlur={handleBlur("risk")}
              value={values.risk}
              placeholder="Enter trip risk assessment"
            />

            <Text>Trip Description:</Text>
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholder="Enter trip description"
            />

            <Button title="Back" onPress={props.setIsModalVisible}></Button>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </Modal>
  );
};
export default EditTrip;

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
