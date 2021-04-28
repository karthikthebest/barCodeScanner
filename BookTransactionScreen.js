import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import *as Permissions from 'expo-permissions';

export default class transaction extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }

    getCameraPermission = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:state==="granted",
            buttonState:'clicked',
            scannned:false,
        })
    }

    handleBarCodeScanned = async({type,data})=>{
         this.setState({
             scanned:true,
             scannedData:data,
             buttonState:'normal',
             
         })
    }
    
 
    handleTransaction =()=>{
        var transactionMessage = null
        db.collection("books").doc(this.state.scannedBookID).get()
        .then((doc) =>{
          var book = doc.data()
          if (book.bookAvailability){
           this.initiateBookIssue()
           transactionMessage = "Book Issued"
          }
          else{
            this.initiateBookReturn()
            transactionMessage = "Book Returned"
          }
          console.log(doc.data())
        })
        
    }

   render(){
       const hasCameraPermissions = this.state.hasCameraPermissions
       const scanned = this.state.scanned
       const buttonState = this.state.buttonState
       if(buttonState==="clicked"&&hasCameraPermissions){
           return(
               <BarCodeScanner
               onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
               style = {StyleSheet.absoluteFillObject}

               />
           )
       }
       else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
              <Image
                source={require("../assets/barcode_scanner.png")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>QR Code Scanner</Text>
            </View>
            <View style={styles.inputView}>
           
            <TouchableOpacity 
              style={styles.displayText}
              onPress={()=>{
                this.getCameraPermissions("BookId")
              }}>
              <Text style={styles.submitButton}>Scan QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.displayText}>
              <Text style={styles.displayText}>
                Request Camera Permision
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      margin:10,
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    submitButton:{
      backgroundColor: "aqua",
      width:100,
      height:20,
    },
  });