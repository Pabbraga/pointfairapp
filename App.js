import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/auth';
import Root from './routes/Root';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Root/>
      </AuthProvider>
    </NavigationContainer>
  );
}