import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { deleteDoc, updateDoc, doc, db } from '../../firebase';

const ShoppingItem = (props) => {

    const [isChecked, setIsChecked] = useState(props.isChecked)

    async function updateIsChecked() {
        const shoppingRef = doc(db, "shopping", props.id);

        await updateDoc(shoppingRef, {
            isChecked: isChecked,
        });
    };

    async function deleteShoppingItem() {
        await deleteDoc(doc(db, "shopping", props.id));
        props.getShoppingList();
    };

    useEffect(() => {
        updateIsChecked();
    }, [isChecked])

    

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable onPress={deleteShoppingItem}>
                <MaterialIcons name="delete" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default ShoppingItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "lightgray",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: "500",
    },
})