import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ItemCard({ title, description, onPress, completed }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text 
              style={[
                styles.cardTitle,
                completed && styles.completedText
              ]}
            >
              {title}
            </Text>
            <Text 
              style={[
                styles.cardDescription,
                completed && styles.completedText
              ]}
            >
              {description}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#2C2C2C',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
});