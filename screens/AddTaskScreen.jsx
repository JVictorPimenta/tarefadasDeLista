import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleConfirm = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um título para a tarefa.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    navigation.navigate('Home', {
      screen: 'Home',
      params: { newItem },
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Tarefa</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Título*</Text>
        <TextInput
          style={styles.input}
          placeholder="O que precisa ser feito?"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />

        <Text style={styles.label}>Detalhes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Adicione detalhes importantes..."
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          maxLength={200}
        />

        <Text style={styles.label}>Prioridade</Text>
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'low' && styles.priorityLowActive,
            ]}
            onPress={() => setPriority('low')}
          >
            <Text style={styles.priorityButtonText}>Baixa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'medium' && styles.priorityMediumActive,
            ]}
            onPress={() => setPriority('medium')}
          >
            <Text style={styles.priorityButtonText}>Média</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'high' && styles.priorityHighActive,
            ]}
            onPress={() => setPriority('high')}
          >
            <Text style={styles.priorityButtonText}>Alta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Salvar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2C2C2C',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  priorityButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  priorityLowActive: {
    backgroundColor: '#388E3C',
    borderColor: '#388E3C',
  },
  priorityMediumActive: {
    backgroundColor: '#FFA000',
    borderColor: '#FFA000',
  },
  priorityHighActive: {
    backgroundColor: '#B00020',
    borderColor: '#B00020',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B00020',
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#6F2DA8',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#6F2DA8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});