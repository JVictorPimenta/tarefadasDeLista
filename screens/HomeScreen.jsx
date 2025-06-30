import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const initialData = [
  { id: '1', title: 'Item 1', description: 'Descrição do item 1', completed: false },
  { id: '2', title: 'Item 2', description: 'Descrição do item 2', completed: false },
  { id: '3', title: 'Item 3', description: 'Descrição do item 3', completed: false },
  { id: '4', title: 'Item 4', description: 'Descrição do item 4', completed: false },
  { id: '5', title: 'Item 5', description: 'Descrição do item 5', completed: false },
];

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('all');

  const toggleComplete = (id) => {
    setData(data.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const filteredData = data.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'pending') return !item.completed;
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { item })}
      >
        <Text style={[styles.cardTitle, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        <Text style={[styles.cardDescription, item.completed && styles.completedText]}>
          {item.description}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => toggleComplete(item.id)}
      >
        <Text style={styles.completeButtonText}>
          {item.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterAllActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterButtonText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.filterPendingActive]}
          onPress={() => setFilter('pending')}
        >
          <Text style={styles.filterButtonText}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.filterCompletedActive]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterButtonText}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>+ Adicionar tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    backgroundColor: '#1E1E1E',
  },
  filterAllActive: {
    backgroundColor: '#6F2DA8',
  },
  filterPendingActive: {
    backgroundColor: '#FFA000',
  },
  filterCompletedActive: {
    backgroundColor: '#388E3C',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#BDBDBD',
    marginTop: 5,
  },
  completedText: {
    color: '#6F2DA8',
    textDecorationLine: 'line-through',
  },
  completeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#6F2DA8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6F2DA8',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
