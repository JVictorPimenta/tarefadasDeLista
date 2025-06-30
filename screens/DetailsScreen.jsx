import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function DetailsScreen({ navigation, route }) {
  const { item } = route.params || {};
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [originalData, setOriginalData] = useState({
    title: item?.title || '',
    description: item?.description || ''
  });

  // Tema escuro com ajustes visuais
  const theme = {
    background: '#121212',
    cardBg: '#2D2D2D',  // Cinza mais claro para a caixa central
    textPrimary: '#FFFFFF',
    textSecondary: '#BDBDBD',
    border: '#424242',
    accent: '#6F2DA8',
    buttonDanger: '#D32F2F',
    buttonSuccess: '#388E3C',
    buttonEdit: '#1976D2'
  };

  // Atualiza a HomeScreen quando sai da tela
  useEffect(() => {
    return () => {
      if (title !== originalData.title || description !== originalData.description) {
        navigation.navigate('Home', {
          updatedItem: {
            ...item,
            title,
            description
          }
        });
      }
    };
  }, [title, description]);

  const handleSave = () => {
    setIsEditing(false);
    setOriginalData({ title, description });
  };

  const handleBack = () => {
    if (title !== originalData.title || description !== originalData.description) {
      Alert.alert(
        'Salvar alterações?',
        '',
        [
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => navigation.goBack()
          },
          {
            text: 'Salvar',
            onPress: () => {
              handleSave();
              navigation.goBack();
            }
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Cabeçalho editável */}
      <View style={styles.header}>
        {isEditing ? (
          <TextInput
            style={[styles.titleInput, { color: theme.textPrimary }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Título"
            placeholderTextColor={theme.textSecondary}
            autoFocus
          />
        ) : (
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {title || 'Sem título'}
          </Text>
        )}
      </View>

      {/* Área de conteúdo rolável */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.contentBox, { backgroundColor: theme.cardBg }]}>
          {isEditing ? (
            <TextInput
              style={[
                styles.descriptionInput, 
                { 
                  color: theme.textPrimary,
                  borderColor: theme.border
                }
              ]}
              value={description}
              onChangeText={setDescription}
              multiline
              placeholder="Digite sua descrição..."
              placeholderTextColor={theme.textSecondary}
              textAlignVertical="top"
            />
          ) : (
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {description || 'Nenhuma descrição'}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Botões arredondados */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button, 
            { 
              backgroundColor: theme.buttonDanger,
              borderRadius: 25
            }
          ]}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button, 
            { 
              backgroundColor: isEditing ? theme.buttonSuccess : theme.accent,
              borderRadius: 25,
              opacity: isEditing && !description ? 0.6 : 1
            }
          ]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isEditing && !description}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'SALVAR' : 'EDITAR'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6F2DA8',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  contentBox: {
    borderRadius: 12,
    padding: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  descriptionInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 180,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
  },
  button: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});