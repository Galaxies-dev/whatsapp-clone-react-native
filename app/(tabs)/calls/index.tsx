import SearchField from '@/components/SearchField';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { View, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SegmentedControl } from '@/components/SegmentedControl';
import calls from '@/assets/data/calls.json';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp } from 'react-native-reanimated';

const transition = CurvedTransition.delay(100);

const Page = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [items, setItems] = useState(calls);

  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'All') {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={selectedOption}
              onOptionPress={onSegmentChange}
            />
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <SearchField />

        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            skipEnteringExitingAnimations
            data={items}
            scrollEnabled={false}
            itemLayoutAnimation={transition}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item, index }) => (
              <Animated.View
                style={defaultStyles.item}
                entering={FadeInUp.delay(index * 20)}
                exiting={FadeOutUp}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ fontSize: 18, color: item.missed ? Colors.red : '#000' }}>
                    {item.name}
                  </Text>

                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <Text style={{ color: Colors.gray }}>{format(item.date, 'MM.dd.yy')}</Text>
                  <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
                </View>
              </Animated.View>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
export default Page;
