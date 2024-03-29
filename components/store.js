import React, { Component, useState, useEffect, Fragment } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image,SafeAreaView,ScrollView, FlatList } from 'react-native';
import firebase from '../database/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { BottomNavigation, BottomNavigationItem } from 'material-bread';


export default class store extends React.Component {
  state={
    uid:firebase.auth().currentUser.uid,
    displayName: firebase.auth().currentUser.displayName,
    lists:[],
    value:0
  }
    componentDidMount(){
        const recentPostsRef = firebase.database().ref('/store');
        recentPostsRef.once('value').then(snapshot => {
            this.setState({lists : Object.values(snapshot.val()) })
            
        })
    }

    

    details = (id) => {
      
      this.props.navigation.navigate('details', {id: id})
    }

  render() {
     
    console.log(this.state.lists)
     

  

    return (
      
      <SafeAreaView style={styles.container}> 
      <ScrollView style={styles.scrollView}>
      
        {this.state.lists.map((current, i) => (
          <Fragment>
            <TouchableOpacity style={styles.card}  onPress={() => this.details(current.id)}>
                <Image style={styles.img} source={{uri: current.imageUrl}}/>
                <Text  style={styles.txt} key={i}>{current.name}</Text>
                <Text  style={styles.txt} key={1}>{current.size}</Text>
                <Text style={styles.txt} key={2}>LKR.{current.price}</Text>
            </TouchableOpacity>
           </Fragment>
                    ))}
                                           
      </ScrollView>  
      
      <BottomNavigation 
            style={{ maxWidth: 672, width: '100%' }}
            showLabels
            backgroundColor={'#c1a1d3'}
            value={this.state.value}
            
            handleChange={(value) => this.setState({value})}
            actionItems={[
              <BottomNavigationItem icon={'home'} label={'Store'} onPress={() => this.props.navigation.navigate('store')} />,
              <BottomNavigationItem icon={'shopping-cart'} label={'Cart'} onPress={() => this.props.navigation.navigate('cart')} />,
              <BottomNavigationItem icon={'favorite'} label={'Orders'} onPress={() => this.props.navigation.navigate('orders')} />,
              <BottomNavigationItem icon={'settings'} label={'Profile'} onPress={() => this.props.navigation.navigate('Dashboard')}/>, 
            ]}
        /> 
          
      </SafeAreaView>

  
    );
  
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    
    
    
  },
  scrollView: {
    
    
    backgroundColor: '#e8e8e8',
    padding: 0,
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
    card:{
      flex: 1, 
      margin:10,
      justifyContent: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,  
      elevation: 10,
      backgroundColor:'#FFFFFF',
      borderRadius: 10,
      height:200,
      
},

    tab:{
      
      flexDirection:'row',
      justifyContent: "center",
      shadowColor: '#dddddd',
      shadowOffset: { width: 0, height: -15 },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,  
      elevation: 50,
      backgroundColor:'#FFFFFF',
      
      height:50,
      
},
tab1:{
  textAlignVertical: 'center',
    textAlign:'center',
  fontSize:15,
  height:40,
  
},
  txt:{
      
      textAlign:'center',
      textAlignVertical:'center',
      color: '#495464',
      borderRadius:10,
      fontSize:20,
      fontWeight: 'bold'
      
},
 img:{
  
  
   resizeMode: "center",
   height:'40%',
   width:'100%'
 },
 btn1:{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,  
  elevation: 10,
  backgroundColor:'#FFFFFF',
  borderRadius: 5,
  margin:5,
  width:80
},
});