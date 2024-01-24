import AppleStyleSwipeableRow from '@/components/AppleStyleSwipeableRow';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { FC } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({ id, from, date, img, msg, read, unreadCount }) => {
  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats/${id}`} asChild>
        <TouchableHighlight activeOpacity={0.8} underlayColor={Colors.lightGray}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              paddingLeft: 20,
              paddingVertical: 10,
            }}>
            <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{from}</Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>
                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
              </Text>
            </View>
            <Text style={{ color: Colors.gray, paddingRight: 20, alignSelf: 'flex-start' }}>
              {format(date, 'MM.dd.yy')}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
};
export default ChatRow;
