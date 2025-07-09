import CustomButton from '@/components/CustomButton'
import CustomeInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'


const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name: '', email: '', password: ''})

  const submit = async () => {
    const {name, email, password } = form //So we dont need to call form.name but just name
    if(!name || !email  || !password) return Alert.alert('Error', 'please enter valid email address password')

      setIsSubmitting(true);

      try {
        //call Appwrite Sign Up Function
        await createUser({ email, password, name })
       
        router.replace('/')
      } catch (error: any) {
        Alert.alert('Error', error.message)
      } finally {
        setIsSubmitting(false)
      }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

<CustomeInput
        placeholder='Enter your full aame'
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({...prev, name: text }))}
        label='Full name'
        keyboardType='default'
        />

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
         title='Sign Up'
         isLoading={isSubmitting}
         onPress={submit}
        />
        <View className='flex justify-center mt-5 flex-row gap-2'>
           <Text className='base-regular text-gray-100'> Already have an account?</Text>
           <Link href="/sign-in" className='base-bold text-primary'>Sign In</Link>
        </View>

    </View>
  )
}

export default SignUp