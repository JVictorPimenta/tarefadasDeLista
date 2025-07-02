import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTasks } from '../context/TaskContext';

export default function HomeScreen({ navigation }) {
  const { tasks, toggleComplete } = useTasks();
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredData = tasks.filter(item => {
    const statusOk =
      filter === 'all' ||
      (filter === 'completed' && item.completed) ||
      (filter === 'pending' && !item.completed);

    const priorityOk =
      priorityFilter === 'all' || item.priority === priorityFilter;

    return statusOk && priorityOk;
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
        <Text style={{ color: '#888', marginTop: 4 }}>
          Prioridade: {item.priority}
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

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, priorityFilter === 'all' && styles.filterAllActive]}
          onPress={() => setPriorityFilter('all')}
        >
          <Text style={styles.filterButtonText}>Todas Prioridades</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, priorityFilter === 'high' && styles.filterCompletedActive]}
          onPress={() => setPriorityFilter('high')}
        >
          <Text style={styles.filterButtonText}>Alta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, priorityFilter === 'medium' && styles.filterPendingActive]}
          onPress={() => setPriorityFilter('medium')}
        >
          <Text style={styles.filterButtonText}>Média</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, priorityFilter === 'low' && styles.filterAllActive]}
          onPress={() => setPriorityFilter('low')}
        >
          <Text style={styles.filterButtonText}>Baixa</Text>
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    backgroundColor: '#1E1E1E',
    margin: 5,
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
