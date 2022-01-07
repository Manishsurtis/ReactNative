import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  setState,
} from "react-native";
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      item: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      });
  }
  _renderItem = ({ item, index, navigation }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={() => navigate("Details", item)}>
        <View style={styles.item}>
          <Text style={styles.textItem}> {item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    let { container } = styles;
    let { dataSource, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View style={container}>
          <Text></Text>
          <FlatList
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textItem: {
    fontSize: 20,
  },
});
