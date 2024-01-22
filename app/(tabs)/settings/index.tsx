import BoxedIcon from '@/components/BoxedIcon';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, ScrollView, TextInput, Text, FlatList } from 'react-native';
const Page = () => {
  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: Colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: Colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor: Colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: Colors.red,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.gray} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.gray}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>

        <View style={styles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>

        <View style={styles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>
      </ScrollView>
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
  block: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.disabled,
    marginLeft: 50,
  },
});
export default Page;
