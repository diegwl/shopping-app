import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Pressable, View, TextInput, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import ShoppingItem from './components/ShoppingItem';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { app, db, getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from './firebase';

export default function App() {

  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id)
      setTitle("");
    } catch (e) {
      console.log("Error adding document: ", e)
    }
  }

  const getShoppingList = async() => {
    let items = []
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.forEach((doc) => {
      items.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setShoppingList(items)
  }

  async function deleteAll() {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    querySnapshot.docs.map((item) => {
      deleteDoc(doc(db, "shopping", item.id))
    });
    getShoppingList();
  }

  useEffect(() => {
    getShoppingList();
  }, [addShoppingItem]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.nOfItems}>{shoppingList.length}</Text>
        <Pressable onPress={deleteAll}>
            <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>

{
      shoppingList.length > 0 ? (
      <FlatList
        data={shoppingList}
        renderItem={({item}) => <ShoppingItem id={item.id} title={item.title} isChecked={item.isChecked} getShoppingList={getShoppingList}/>}
        key={item => item.id}
      /> ) : (
      <AntDesign name='shoppingcart' size={200} color="black" style={{alignSelf: 'center', marginTop: '30%'}}/>
      )
    }

      <View style={styles.containerInput}>
        <TextInput 
            placeholder='Enter shopping item'
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            onSubmitEditing={addShoppingItem}
          />
          <Pressable style={styles.send} onPress={addShoppingItem}>
            <MaterialIcons name="send" size={40} color="black" />
          </Pressable>
      </View>
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  nOfItems: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "85%",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 10,
  },
  containerInput: {
    flex: 1,
    marginTop: "auto",
    marginHorizontal: 10,
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  send: {
    marginTop: "auto",
    backgroundColor: "#4232a8",
    padding: 8,
    borderRadius: 30,
    marginBottom: 10,
  }
});
