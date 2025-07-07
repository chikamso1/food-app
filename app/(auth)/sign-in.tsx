import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const signIn = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <Button title='Sign Up' onPress={() => router.push("/(auth)/sign-up")}  />
    </View>
  )
}

export default signIn