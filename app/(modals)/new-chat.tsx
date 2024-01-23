import { View, Text, SectionList, StyleSheet, StatusBar } from 'react-native';
import contacts from '@/assets/data/contacts.json';
import { useState } from 'react';
import Colors from '@/constants/Colors';

const Page = () => {
  // Define sections from A-Z with {title: 'A', data: [contacts.filter((contact) => contact.last_name[0] === 'A')]}
  const sections = [
    {
      title: 'A',
      data: contacts.filter((contact) => contact.last_name[0] === 'A'),
    },
    {
      title: 'B',
      data: contacts.filter((contact) => contact.last_name[0] === 'B'),
    },
    {
      title: 'C',
      data: contacts.filter((contact) => contact.last_name[0] === 'C'),
    },
    {
      title: 'D',
      data: contacts.filter((contact) => contact.last_name[0] === 'D'),
    },
    {
      title: 'E',
      data: contacts.filter((contact) => contact.last_name[0] === 'E'),
    },
    {
      title: 'F',
      data: contacts.filter((contact) => contact.last_name[0] === 'F'),
    },
    {
      title: 'G',
      data: contacts.filter((contact) => contact.last_name[0] === 'G'),
    },
    {
      title: 'H',
      data: contacts.filter((contact) => contact.last_name[0] === 'H'),
    },
    {
      title: 'I',
      data: contacts.filter((contact) => contact.last_name[0] === 'I'),
    },
    {
      title: 'J',
      data: contacts.filter((contact) => contact.last_name[0] === 'J'),
    },
    {
      title: 'K',
      data: contacts.filter((contact) => contact.last_name[0] === 'K'),
    },
    {
      title: 'L',
      data: contacts.filter((contact) => contact.last_name[0] === 'L'),
    },
    {
      title: 'M',
      data: contacts.filter((contact) => contact.last_name[0] === 'M'),
    },
    {
      title: 'N',
      data: contacts.filter((contact) => contact.last_name[0] === 'N'),
    },
    {
      title: 'O',
      data: contacts.filter((contact) => contact.last_name[0] === 'O'),
    },
    {
      title: 'P',
      data: contacts.filter((contact) => contact.last_name[0] === 'P'),
    },
    {
      title: 'Q',
      data: contacts.filter((contact) => contact.last_name[0] === 'Q'),
    },
    {
      title: 'R',
      data: contacts.filter((contact) => contact.last_name[0] === 'R'),
    },
    {
      title: 'S',
      data: contacts.filter((contact) => contact.last_name[0] === 'S'),
    },
    {
      title: 'T',
      data: contacts.filter((contact) => contact.last_name[0] === 'T'),
    },
    {
      title: 'U',
      data: contacts.filter((contact) => contact.last_name[0] === 'U'),
    },
    {
      title: 'V',
      data: contacts.filter((contact) => contact.last_name[0] === 'V'),
    },
    {
      title: 'W',
      data: contacts.filter((contact) => contact.last_name[0] === 'W'),
    },
    {
      title: 'X',
      data: contacts.filter((contact) => contact.last_name[0] === 'X'),
    },
    {
      title: 'Y',
      data: contacts.filter((contact) => contact.last_name[0] === 'Y'),
    },
    {
      title: 'Z',
      data: contacts.filter((contact) => contact.last_name[0] === 'Z'),
    },
  ];
  console.log(sections[0].data);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.last_name + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{`${item.first_name} ${item.last_name}`}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        style={{ marginTop: 120 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Page;
