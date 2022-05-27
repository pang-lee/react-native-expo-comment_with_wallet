// import React from 'react';
import React from 'react';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfilePicture from "../ProfilePicture/index";

const Story = (props) => {
  const {
    story: {
      user: {
        id,
        image,
        name
      }
    }
  } = props;

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Story", { userId: id });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ProfilePicture uri={image}/>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  name: {
    textAlign: 'center',
  }
});

export default Story;
