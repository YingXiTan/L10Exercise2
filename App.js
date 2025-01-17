import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A2E',
    },

    card:{
        flex: 1,
        flexDirection: 'column',
        width: 350,
        height: 100,
        paddingBottom: 5,
        borderWidth : 3,
        borderRadius: 5,
        borderColor: '#F2D785',
        backgroundColor: '#1E1F26'
    },

    name :{
        fontSize: 18,
        alignSelf: 'center',
        color: '#F2D785',
        fontWeight: 'bold',
        marginBottom: 5,
        textDecorationLine: 'underline',
    },

    details :{
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: 15,
        color: '#E0E0E0'
    },

    inputText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F2D785',
        marginBottom: 15,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },

    inputBox :{
        borderWidth: 3,
        height: 40,
        width: 350,
        borderRadius: 5,
        borderColor: '#F2D785',
        color: '#F2D785',
        backgroundColor: '#292B3E'
    },

    starBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: -1,
        borderRadius: 15,
        opacity: 0.1,
    }
})

//CREATE NEW VARIABLE
let originalData = []

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch( "https://mysafeinfo.com/api/data?list=brightstars&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if (originalData.length < 1) {
            setMydata(myJson);
            originalData = myJson;
          }
        })
  }, []);

  //CREATE FilterData() FUNCTION
  const FilterData = (text) => {
    if (text !== '') {
      let myFilteredData = originalData.filter((item) =>
          item.StarName.toLowerCase().includes(text.toLowerCase()));
      setMydata(myFilteredData);
    }
    else {
      setMydata(originalData)
    }
  }

  const renderItem = ({item, index}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.name}> {item.StarName} </Text>
                <Text style={styles.details}> Magnitude: {item.Magnitude} </Text>
                <Text style={styles.details}> Light Years: {item.LightYrs} </Text>
            </View>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar/>
        <Text style={styles.inputText}>Brightest Stars</Text>
        <TextInput style={styles.inputBox} onChangeText={(text => {FilterData(text)})} placeholder={"Search by Name"} placeholderTextColor="#F2D785"/>
        <FlatList data={mydata} renderItem={renderItem} />
          <View style={styles.starBackground} />
      </View>

  );
}

export default App;
