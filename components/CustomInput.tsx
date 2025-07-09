import { CustomInputProps } from '@/type';
import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomeInput = ({
  placeholder= 'Enter Text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType="default",
}: CustomInputProps) => {

  const [isFocused, setisFocused] = useState(false);
  return (
    <View className='w-full '>
      <Text className='label'>{label}</Text>

      <TextInput
       autoCapitalize='none'
       autoCorrect={false}
       value={value}
       onChangeText={onChangeText}
       secureTextEntry={secureTextEntry}
       keyboardType={keyboardType}
       onFocus={()=>setisFocused(true)}
       onBlur={() => setisFocused(false)}
       placeholder={placeholder}
       placeholderTextColor="#888"
       className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
      />
    </View>
  )
}

export default CustomeInput