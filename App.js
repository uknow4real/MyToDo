import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
// custom component
import Todo from './components/Todo';

export default function App() {
  const [todo, setTodo] = useState();
  const [todoItems, setTodos] = useState([]);
  
  const handleCreateTodo = () => {
    Keyboard.dismiss();
    setTodos([...todoItems, todo])
    setTodo(null);
  }

  const completeTodo = (index) => {
    let itemsCopy = [...todoItems];
    itemsCopy.splice(index, 1);
    setTodos(itemsCopy)
  }
  
  return (
    <View style={styles.container}>
      {/* All Todos */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>My ToDo's</Text>

        <View style={styles.items}>
          {
            todoItems.map((todo, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTodo(index)}>
                  <Todo text={todo}/> 
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} 
      style={styles.createTodoWrapper}>
        <TextInput style={styles.input} placeholder={'Create a ToDo'} value={todo} onChangeText={text => setTodo(text)}></TextInput>
        <TouchableOpacity onPress={() => handleCreateTodo()}>
          <View style={styles.createWrapper}>
            <FontAwesomeIcon style={styles.addButton} icon={faPlusSquare} />
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  }, 
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  items: {
    
  },
  createTodoWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    fontWeight: "600",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#E8EAED',
    borderWidth: 1,
    width: 250
  },
  createWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fca503',
    borderRadius: 60,
    borderColor: '#E8EAED',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    color: '#FFFF'
  }
});
