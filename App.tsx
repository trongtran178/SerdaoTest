import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  CreateBeneficiaryScreen,
  TransactionScreen,
} from './src/screens';
import {TransactionProvider} from './src/contexts/TransactionContext';
import {BeneficiariesProvider} from './src/contexts/BeneficariesContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Transaction: undefined;
  CreateBeneficiary: undefined;
};

const App = () => {
  return (
    <GestureHandlerRootView>
      <TransactionProvider>
        <BeneficiariesProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Transaction" component={TransactionScreen} />
              <Stack.Screen
                name="CreateBeneficiary"
                options={{title: 'Create Beneficiary'}}
                component={CreateBeneficiaryScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BeneficiariesProvider>
      </TransactionProvider>
    </GestureHandlerRootView>
  );
};

export default App;
