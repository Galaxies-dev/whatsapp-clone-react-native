import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  SectionList,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSyncContacts, type SyncedContact } from '@/hooks/useSyncContacts';

const NewChatScreen = () => {
  const insets = useSafeAreaInsets();
  const { contacts, loading, error, permissionDenied, syncContacts, refetch } = useSyncContacts();

  useEffect(() => {
    syncContacts();
  }, [syncContacts]);

  const getSectionedContacts = () => {
    if (contacts.length === 0) return [];
    const sections: { title: string; data: SyncedContact[] }[] = [];
    const contactsByLetter: { [key: string]: SyncedContact[] } = {};
    contacts.forEach((contact) => {
      const firstLetter = (contact.device_contact_name || 'A')[0].toUpperCase();
      if (!contactsByLetter[firstLetter]) {
        contactsByLetter[firstLetter] = [];
      }
      contactsByLetter[firstLetter].push(contact);
    });
    Object.keys(contactsByLetter)
      .sort()
      .forEach((letter) => {
        sections.push({ title: letter, data: contactsByLetter[letter] });
      });
    return sections;
  };

  const handleContactPress = (contact: SyncedContact) => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: contact.user_id },
    });
  };

  const renderContactItem = ({ item }: { item: SyncedContact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {item.avatar_url ? (
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{item.device_contact_name[0].toUpperCase()}</Text>
          </View>
        )}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName} numberOfLines={1}>
          {item.device_contact_name}
        </Text>
        <Text style={styles.contactPhone} numberOfLines={1}>
          {item.phone}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {permissionDenied ? (
        <>
          <MaterialCommunityIcons name="phone-off" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Permission Denied</Text>
          <Text style={styles.emptySubtitle}>
            Please grant access to contacts in app settings
          </Text>
        </>
      ) : contacts.length === 0 && !loading ? (
        <>
          <MaterialCommunityIcons name="contacts" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Contacts</Text>
          <Text style={styles.emptySubtitle}>
            No matching contacts found
          </Text>
        </>
      ) : null}
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name="alert-circle" size={64} color="#ff6b6b" />
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={syncContacts}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  const sections = getSectionedContacts();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading && sections.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#075E54" />
          <Text style={styles.loadingText}>Syncing contacts...</Text>
        </View>
      ) : error && sections.length === 0 ? (
        renderErrorState()
      ) : sections.length === 0 ? (
        renderEmptyState()
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} tintColor="#075E54" />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#666', fontWeight: '500' },
  listContent: { paddingBottom: 20 },
  sectionHeader: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f5f5f5' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#666' },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: { marginRight: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e0e0e0' },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#075E54' },
  avatarText: { fontSize: 20, fontWeight: '600', color: '#fff' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: '500', color: '#000', marginBottom: 4 },
  contactPhone: { fontSize: 14, color: '#999' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#000', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#999', marginTop: 8, textAlign: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  errorTitle: { fontSize: 18, fontWeight: '600', color: '#ff6b6b', marginTop: 16 },
  errorMessage: { fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' },
  retryButton: { marginTop: 20, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: '#075E54', borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default NewChatScreen;
