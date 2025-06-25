import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const DATA = [
  { id: '1', title: 'Item 1', description: 'Descrição do item 1' },
  { id: '2', title: 'Item 2', description: 'Descrição do item 2' },
  { id: '3', title: 'Item 3', description: 'Descrição do item 3' },
  { id: '4', title: 'Item 4', description: 'Descrição do item 4' },
  { id: '5', title: 'Item 5', description: 'Descrição do item 5' },
];

export default function HomeScreen({ navigation }) {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <View style={styles.counterContainer}>
    </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#C3C3C3' }]}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.buttonText}>Adicionar tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  counterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  

