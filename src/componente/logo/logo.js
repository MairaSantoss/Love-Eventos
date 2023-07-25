/*FIZ DESTA FORMA

usei o site npm.io para baixar as fontes...

    ##############m  Na raiz do projeto executar #######################

    expo install @expo-google-fonts/jolly-lodger expo-font expo-app-loading
    expo install @expo-google-fonts/maven-pro expo-font expo-app-loading
*/
//expo install @expo-google-fonts/jolly-lodger expo-font expo-app-loading

import React from 'react';
import { View, Text } from 'react-native';
import { useFonts, JollyLodger_400Regular } from '@expo-google-fonts/jolly-lodger';
import { MavenPro_400Regular } from '@expo-google-fonts/maven-pro';


export default function IndexFont() {
  let [fontsLoaded] = useFonts({
    JollyLodger_400Regular,
    MavenPro_400Regular
  });

  return (
    <View>
      <Text
        style={{
          fontSize: 100,
          paddingVertical: 6,
          fontFamily: "JollyLodger_400Regular",
        }}
      >
        Triboon
      </Text>

      <Text
        style={{
          fontSize: 50,
          paddingVertical: 6,
          fontFamily: "MavenPro_400Regular",
        }}
      >
        Essa é a fonte do dos demais itens
      </Text>
    </View>
  );
}