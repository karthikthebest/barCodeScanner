import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
 import TransactionScreen from "./screens/BookTransactionScreen";


export default class App extends React.Component {
  render(){
    return (
      
        <AppContainer />
      
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
     
     
    }
  })
}
);




const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center"
  }
});