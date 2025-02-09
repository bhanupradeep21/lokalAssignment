import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import JobCard from '../components/JobCard';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      setJobs(prev => [...prev, ...response.data.data]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [page]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setJobs([]);
    setPage(1);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <JobCard job={item} navigation={navigation} />}
          onEndReached={() => setPage(prev => prev + 1)}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
}
