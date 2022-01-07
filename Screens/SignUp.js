import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
const validator = require("validator");

const SignUp = ({ navigation }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setdataSource] = useState([]);

  function onSignOnPressed() {
    if (firstName.length > 0) {
      if (lastName.length > 0) {
        if (email.length > 1 || password.length > 1) {
          if (validator.isEmail(email) || password.length > 1) {
            if (password.length > 0) {
              fetch("https://mychangeuk.nicheapps.in/api/User/Registration", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phoneNo: phoneNo,
                  password: password,
                }),
              })
                .then((response) => response.json())
                .then((data) =>
                  Alert.alert(
                    "",
                    data.message,
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed!"),
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          navigation.goBack();
                        },
                      },
                    ],
                    { cancelable: false }
                  )
                );
            } else {
              // alert("Pleas enter first name");
              alert("Pleas enter password");
            }
          } else {
            // alert("Pleas enter first name");
            alert("Pleas valid email or contact number");
          }
        } else {
          // alert("Pleas enter last name");
          alert("Pleas enter email or contact number");
        }
      } else {
        //alert("Pleas enter email or contact number");
        alert("Pleas enter last name");
      }
    } else {
      //alert("Pleas enter password");
      alert("Pleas enter first name");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userTextView}>
          <TextInput
            style={styles.inputStyle}
            value={firstName}
            onChangeText={(firstName) => setfirstName(firstName)}
            placeholder={"Enter first name"}
          />
        </View>

        <View style={styles.userTextView}>
          <TextInput
            style={styles.inputStyle}
            value={lastName}
            onChangeText={(lastName) => setlastName(lastName)}
            placeholder={"Enter last name"}
          />
        </View>

        <View style={styles.userTextView}>
          <TextInput
            style={styles.inputStyle}
            value={email}
            onChangeText={(email) => setemail(email)}
            placeholder={"Enter email"}
            keyboardType="email"
          />
        </View>

        <View style={styles.userTextView}>
          <TextInput
            style={styles.inputStyle}
            value={phoneNo}
            onChangeText={(phoneNo) => setphoneNo(phoneNo)}
            placeholder={"Enter phone number"}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.userTextView}>
          <TextInput
            value={password}
            onChangeText={(password) => setpassword(password)}
            placeholder={"Enter password"}
            style={styles.inputStyle}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.BtnView}>
          <Pressable onPress={onSignOnPressed} style={styles.container_PRIMARY}>
            {<Text style={[styles.text, styles.text_PRIMARY]}>Register</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    paddingLeft: 20,
    paddingRight: 20,
  },
  userTextView: {
    height: 50,
    paddingLeft: 10,
    marginVertical: 10,
    backgroundColor: "#DBDBD6",
    borderRadius: 10,
  },
  inputStyle: {
    height: 50,
  },
  BtnLogin: {
    paddingTop: 30,
    backgroundColor: "#3871E3",
    height: 50,
  },
  container_PRIMARY: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3871E3",
    borderRadius: 10,
  },
  text_PRIMARY: {
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },
  BtnView: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
