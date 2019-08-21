import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './src/screens/HomeScreen'
import AddScreen from './src/screens/AddScreen'
import EditScreen from './src/screens/EditScreen'
import NoteScreen from './src/screens/NoteScreen'

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Add: AddScreen,
      Edit: EditScreen,
      Note: NoteScreen,
    },
    {
      initialRouteName: "Home"
    }
  );

export default createAppContainer(AppNavigator);
