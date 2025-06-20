import {
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [tasks, setTasks] = React.useState([
    { title: "Emphatises", done: false, dueDate: new Date() },
    { title: "Ideate", done: false, dueDate: new Date() },
    { title: "Marathon", done: false, dueDate: new Date() },
  ]);
  const [taskTitle, setTaskTitle] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [taskmode, setTaskMode] = React.useState("All");

  const onButtonPress = () => {
    if (taskTitle && date) {
      setTasks([...tasks, { title: taskTitle, done: false, dueDate: date }]);
    }
  };

  const deleteItem = (item) => {
    setTasks([...tasks.filter((t) => t.title !== item.title)]);
  };

  const onTappingTask = (item) => {
    const ind = tasks.findIndex((t) => t.title === item.title);
    tasks.splice(ind, 1, { ...item, done: !item.done });
    setTasks([...tasks]);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDate(currentDate);
  };

  const filterTasks = () => {
    if (taskmode === "All") {
      return tasks;
    } else if (taskmode === "Completed") {
      return tasks.filter((t) => t.done);
    } else {
      return tasks.filter((t) => !t.done);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#e4505e", "#e4505e", "#c02c3e"]}
        style={styles.topContainerStyle}
      >
        <View style={styles.headerViewStyle}>
          <View>
            <Text style={styles.headerTextStyle}>
              Hi, <Text style={{ fontWeight: "bold" }}>Raaj</Text>
            </Text>
            <Text style={styles.pendingTextStyle}>
              {"You have " +
                tasks.filter((t) => !t.done).length +
                " pending tasks"}
            </Text>
          </View>

          <View style={styles.nameIconStyle}>
            <Text style={{ fontSize: 32 }}>R</Text>
          </View>
        </View>

        <View
          style={ styles.tasksModeViewStyle }
        >
          <TouchableOpacity
            onPress={() => {
              setTaskMode("All");
            }}
            style={styles.tasksModeButtonStyle}
          >
            <Text>All Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTaskMode("Completed");
            }}
            style={styles.tasksModeButtonStyle}
          >
            <Text>Completed Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTaskMode("Pending");
            }}
            style={styles.tasksModeButtonStyle}
          >
            <Text>Pending Tasks</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.bottomContainerStyle}>
        {tasks.length > 0 ? (
          <FlatList
            data={filterTasks(tasks)}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlistItem}>
                  <View style={styles.touchableOpacityStyle}>
                    <View style={styles.greenLineStyle} />
                    <View style={styles.itemViewStyle}>
                      <View>
                        <Text
                          style={[
                            { fontSize: 20, fontWeight: "semi-bold" },
                            item.done
                              ? {
                                  textDecorationLine: "line-through",
                                  color: "grey",
                                }
                              : {
                                  color: "black",
                                },
                          ]}
                        >
                          {item.title}
                        </Text>
                        <Text style={styles.dateTextStyle}>
                          {item?.dueDate.toDateString()}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          onTappingTask(item);
                        }}
                      >
                        {item.done ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={32}
                            color="green"
                          />
                        ) : (
                          <FontAwesome5 name="circle" size={32} color="black" />
                        )}
                      </TouchableOpacity>
                      //{" "}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.noDataAvailTextStyle}>
              {"No tasks available. Please add some to get started"}
            </Text>
          </View>
        )}

        <View style={styles.textBoxViewStyle}>
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.inputStyle}
            placeholder={"Add new subtask"}
          />
          <TouchableOpacity onPress={onButtonPress}>
            <AntDesign name="pluscircleo" size={32} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fdd9cb",
    padding: 8,
    paddingTop: 50,
  },
  topContainerStyle: {
    flex: 0.2,
    backgroundColor: "#dc3245",
    width: "100%",
    padding: 12,
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomContainerStyle: {
    flex: 0.8,
    backgroundColor: "#f9e6e3",
    borderBottomEndRadius: 12,
    alignItems: "center",
  },
  headerViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: 24,
    padding: 12,
    color: "white",
  },
  dateTextStyle: {
    fontSize: 16,
    color: "grey",
    fontWeight: "medium",
  },
  nameIconStyle: {
    height: 50,
    width: 50,
    backgroundColor: "#f9e0e4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: " center",
    marginRight: 12,
  },
  noDataAvailTextStyle: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  greenLineStyle: {
    position: "absolute",
    height: "100%",
    width: 14,
    zIndex: 1,
    backgroundColor: "#89f57a",
  },
  inputStyle: {
    height: 70,
    width: "80%",
    marginVertical: 24,
    borderRadius: 8,
    fontSize: 20,
  },
  itemViewStyle: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: "white",
  },
  flatlistItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  touchableOpacityStyle: {
    width: "100%",
    height: 124,
    overflow: "hidden",
    borderRadius: 12,
  },
  textBoxViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    height: 56,
    borderStyle: "dashed",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  tasksModeButtonStyle: {
    backgroundColor: "#f9e0e4",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    fontFamily: "Poppins",
  },
  pendingTextStyle: {
    fontSize: 18,
    paddingLeft: 12,
    color: "white",
  },
  contentContainerStyle: {
    padding: 12,
  },
  tasksModeViewStyle : {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  }
});
