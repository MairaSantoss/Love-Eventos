
import { StatusBar } from 'react-native';

export default function _StatusBar() {

  return (
    <StatusBar
        barStyle = "dark-content"
        hidden = {false}
        backgroundColor = "red"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
    />
  );
}

