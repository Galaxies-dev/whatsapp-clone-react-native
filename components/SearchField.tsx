import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SearchField = () => {
  return (
    <View style={styles.searchSection}>
      <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.gray} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={Colors.gray}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.disabled,
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontSize: 18,
    backgroundColor: Colors.disabled,
    color: '#000',
  },
});

export default SearchField;
