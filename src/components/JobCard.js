import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { BookmarkContext } from '../context/BookmarkContext';

export default function JobCard({ job, navigation }) {
  const { addBookmark } = useContext(BookmarkContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("JobDetails", { job })}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text>📍 {job.location}</Text>
        <Text>💰 {job.salary}</Text>
        <Text>📞 {job.phone}</Text>
        <Button title="Bookmark" onPress={() => addBookmark(job)} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 5 },
  title: { fontSize: 16, fontWeight: 'bold' }
});
