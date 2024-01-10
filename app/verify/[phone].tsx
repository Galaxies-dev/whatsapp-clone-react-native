import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaskInput from 'react-native-mask-input';

const OTP_MASK = [/\d/, ' ', /\d/, ' ', /\d/, '    ', /\d/, ' ', /\d/, ' ', /\d/];

const Page = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (code.length === 6) {
      console.log('verify', code);
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: phone }} />
      <Text style={styles.legal}>We have sent you an SMS with a code to the number above.</Text>
      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digit activation code.
      </Text>

      <MaskInput
        value={code}
        keyboardType="numeric"
        onChangeText={(masked, unmasked) => {
          setCode(unmasked);
        }}
        mask={OTP_MASK}
        placeholderFillCharacter="_"
        placeholderTextColor={'#000'}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  legal: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  input: {
    marginVertical: 20,
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    color: '#000',
  },
});

export default Page;
