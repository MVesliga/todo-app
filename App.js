import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const COLORS = {primary: '#1f145c', white: '#fff'};

export default function App() {
  const [todoList, setTodos ] = React.useState([
    {id: 1, task: 'First todo', completed: true},
    {id: 2, task: 'Second todo', completed: false}
  ]);
  const [textInput, setTextInput] = React.useState('');

  const ListItem = ({todo}) => {
    return <View style={[styles.listItem, styles.shadowProp]}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: COLORS.primary, textDecorationLine: todo?.completed ? 'line-through' : 'none'}}>{todo?.task}</Text>
      </View>
      {
        !todo?.completed && (
          <TouchableOpacity 
            style={[styles.actionIcon]} 
            onPress={() => setTodoCompleted(todo?.id)}>
            <Icon name="done" size={20} color={COLORS.white}/>
          </TouchableOpacity>
        )
      }
      <TouchableOpacity 
        style={[styles.actionIcon, {backgroundColor: 'red'}]}
        onPress={() => deleteTodo(todo?.id)}>
        <Icon name="delete" size={20} color={COLORS.white}/>
      </TouchableOpacity>
    </View>
  }

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Enter TODO text!');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false
      };
  
      setTodos([...todoList, newTodo]);
      setTextInput('');
    }
  };

  const setTodoCompleted = (todoId) => {
    const updatedTodos = todoList.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true}
      }
      return item;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
      const updatedTodos = todoList.filter(item => item.id != todoId);
      setTodos(updatedTodos);
  };

  const clearTodos = () => {
    Alert.alert('Confirm', 'Do you want to clear all todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([])
      },
      {
        text: 'No'
      }
    ]);
      
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.primary}}>TODO APP</Text>
        <Icon name="delete" size={25} color="red" onPress={clearTodos}/> 
      </View>
      <FlatList 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todoList} 
        renderItem={({item}) => <ListItem todo={item} />} />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Add TODO' 
            value={textInput}
            onChangeText={(text) => setTextInput(text)}/>
        </View>
        <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}>
              <Icon name="add" color={COLORS.white} size={30}/>
            </View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  inputContainer: {
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    padding: 15
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3
  }
});
