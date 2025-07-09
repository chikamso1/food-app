import CustomButton from '@/components/CustomButton'
import CustomeInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import { SignInParams } from '@/type'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'


const SignIn = ({ email, password}: SignInParams) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email: '', password: ''})

  const submit = async () => {
    const { email, password } = form //So we dont need to call form.name but just name
    if(!email  || !password) return Alert.alert('Error', 'please enter valid email address password')
      
      setIsSubmitting(true);

      try {
        await signIn({ email, password})
        router.replace('/')
      } catch (error: any) {
        Alert.alert('Error', error.message)
      }finally{
        setIsSubmitting(false);
      }

  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

      <CustomeInput
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({...prev, email: text }))}
        label='Email'
        keyboardType='email-address'
        />

      <CustomeInput
        placeholder='Enter your password'
        value={form.password}
        onChangeText={(text) => setForm((prev) =>({...prev, password: text}))}
        label='Password'
        secureTextEntry={true}
        />


        <CustomButton
         title='Sign In'
         isLoading={isSubmitting}
         onPress={submit}
        />
        <View className='flex justify-center mt-5 flex-row gap-2'>
           <Text className='base-regular text-gray-100'> Don't have an account?</Text>
           <Link href="/sign-up" className='base-bold text-primary'>Sign Up</Link>
        </View>

    </View>
  )
}

export default SignIn