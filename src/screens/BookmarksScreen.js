import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { BookmarkContext } from '../context/BookmarkContext';
import JobCard from '../components/JobCard';

export default function BookmarksScreen({ navigation }) {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {bookmarks.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No bookmarks available</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <JobCard job={item} navigation={navigation} />}
        />
      )}
    </View>
  );
}
