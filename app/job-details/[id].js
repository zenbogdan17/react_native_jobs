import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
} from 'react-native';

import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../customHook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setActiveTab(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? 'No data provided'} />
        );
      default:
        break;
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${
          data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'
        }`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={'60%'}
              handlePress={() => router.push('/')}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              handlePress={onShare}
              iconUrl={icons.share}
              dimension={'60%'}
            />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrog</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            'https://careers.google.com/jobs/results'
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
