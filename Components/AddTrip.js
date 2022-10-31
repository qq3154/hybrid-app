import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Modal,
  Button,
  TextInput,
  Text,
  View,
  Platform,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Formik, Field } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

const AddTrip = (props) => {
  const [date, setDate] = useState(new Date());
  let fDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const [show, setShow] = useState(false);
  const [text, setText] = useState(fDate);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onSubmit = (values) => {
    let risk = isEnabled ? 1 : 0;
    props.addTrip(
      values.name,
      values.destination,
      text,
      risk,
      values.description
    );
    props.setIsModalVisible();
  };

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      tempDate.getMonth() +
      "/" +
      tempDate.getFullYear();
    setText(fDate.toString());
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    destination: Yup.string()
      .min(1, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    description: Yup.string().max(50, "Too Long!"),
  });

  return (
    <Modal visible={props.isModalVisible}>
      <Formik
        initialValues={{
          name: "",
          destination: "",
          date2: "",
          risk: "",
          description: "",
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={SignupSchema}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <View style={styles.form}>
            <View style={styles.top}>
              <View style={styles.sectionTilte}>
                <Text style={styles.tilte}>ADD TRIP</Text>
              </View>

              <Text style={styles.type}>Trip Name:</Text>

              <TextInput
                style={styles.input}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Enter trip name here"
              />
              <Text style={styles.error}>{errors.name}</Text>

              <Text style={styles.type}>Trip Destination:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("destination")}
                onBlur={handleBlur("destination")}
                value={values.destination}
                placeholder="Enter trip destination here"
              />
              <Text style={styles.error}>{errors.destination}</Text>

              <Text style={styles.date}>
                <Text style={styles.type}>Trip Date: </Text>
                <Text
                  style={styles.selectDate}
                  onChangeText={handleChange(values.name)}
                  onBlur={handleBlur(values.name)}
                  value={text}
                >
                  {text}
                </Text>
              </Text>

              <View style={styles.btnDate}>
                <Button title="Pick Date" onPress={() => setShow(true)} />
              </View>

              {show && (
                <DateTimePicker
                  value={date}
                  mode={"date"}
                  onChange={onChange}
                />
              )}

              <View style={styles.groupSwitch}>
                <Text style={styles.type}>Trip Risk Assessment:</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "#767577", true: "#7e7387" }}
                  thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <Text style={styles.type}>Trip Description:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Enter trip description here"
              />
              <Text style={styles.error}>{errors.description}</Text>

              <View style={styles.submitBtn}>
                <Button
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                  title="Submit"
                />
              </View>
            </View>
            <View style={styles.backBtn}>
              <TouchableOpacity
                onPress={props.setIsModalVisible}
                style={styles.roundBtn}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
export default AddTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: "#E8EAED",
    height: "100%",
  },
  top: {
    height: "87%",
  },
  sectionTilte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tilte: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btnDelete: {},
  type: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 14,
    color: "#3e3e3e",
    borderBottomWidth: 1,
  },
  date: {
    marginBottom: 5,
  },
  selectDate: {
    fontSize: 12,
    fontSize: 14,
    color: "#3e3e3e",
  },
  btnDate: {
    width: 100,
    marginBottom: 10,
  },
  groupSwitch: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitBtn: {
    marginTop: 20,
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
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#e0dce3",
  },
  error: {
    fontSize: 10,
    color: "red",
    marginBottom: 20,
  },
});
