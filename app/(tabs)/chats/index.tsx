import SearchField from '@/components/SearchField';
import Colors from '@/constants/Colors';
import { View, Text, ScrollView, FlatList } from 'react-native';
import chats from '@/assets/data/chats.json';
import ChatRow from '@/components/ChatRow';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
          }}>
          <View style={{ flex: 1 }}>
            <SearchField />
          </View>
          <Ionicons
            name="filter-outline"
            size={24}
            color={Colors.primary}
            style={{ paddingRight: 14, alignSelf: 'center' }}
          />
        </View>

        <FlatList
          data={chats}
          renderItem={({ item }) => <ChatRow {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};
export default Page;
