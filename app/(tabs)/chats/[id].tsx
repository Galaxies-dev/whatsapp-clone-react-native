import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const [messages, setMessages]: any[] = useState([]);
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const [replyMsg, setReplyMsg] = useState<any>('Test');

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'Yeah I love it too! Check out this galaxies.dev thing from Simon',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
      {
        _id: 1,
        text: 'Hey mate, I really love this React Native WhatsApp Clone. What do you think?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background }}
        renderActions={() => (
          <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
      />
    );
  };

  const ChatFooter = () => {
    return (
      <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#E4E9EB' }}>
        <View style={{ height: 50, width: 6, backgroundColor: '#89BC0C' }}></View>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              color: '#89BC0C',
              paddingLeft: 10,
              paddingTop: 5,
              fontWeight: '600',
              fontSize: 15,
            }}>
            Bob
          </Text>
          <Text style={{ color: Colors.gray, paddingLeft: 10, paddingTop: 5 }}>{replyMsg}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
          <TouchableOpacity onPress={() => console.log('CLOSE')}>
            <Ionicons name="close-circle-outline" color={Colors.primary} size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/images/pattern.png')}
      style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: Colors.background }}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        renderChatFooter={ChatFooter}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                },
                right: {
                  backgroundColor: Colors.lightGreen,
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              paddingHorizontal: 14,
            }}>
            {text === '' && (
              <>
                <Ionicons name="camera-outline" color={Colors.primary} size={28} />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" color={Colors.primary} size={28} />
              </Send>
            )}
          </View>
        )}
        renderInputToolbar={renderInputToolbar}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default Page;
