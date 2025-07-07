import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const signUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Button title='Sign In' onPress={() => router.push("/(auth)/sign-in")}  />
    </View>
  )
}

export default signUp