import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id: firebase.auth().currentUser.email,
            receiver_id: "",
            request_id: "",
            bookName: "",
            reasonForRequest: "",
            receiver_name: "",
            receiver_contact: "",
            receiver_address: "",
            receiver_doc_id: "",
        }
    }

    updateStateWithUserInfo = () => {
        this.setState({
            receiver_id: this.props.navigation.getParam("Details")["user_id"],
            request_id: this.props.navigation.getParam("Details")["request_id"],
            bookName: this.props.navigation.getParam("Details")["book_name"],
            reasonForRequest: this.props.navigation.getParam("Details")["reason_to_request"],
        })
    }

    componentDidMount = () => {
         this.updateStateWithUserInfo();
         setTimeout( () => {this.getReceiverDetails()}, 1000)
    }

    getReceiverDetails = () => {
        db.collection("users").where("email_id", "==", this.state.receiver_id).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiver_name: doc.data().first_name + " " + doc.data().last_name,
                    receiver_contact: doc.data().contact,
                    receiver_address: doc.data().address,
                })
            })
        })
    }

    render(){
        return(
        <View style={styles.container}>
            <ScrollView>
                <MyHeader title=" Receiver Details Screen "/>
                <View style={{flex: 0.3}}>
                    <Card>
                        <Text>Book: {this.state.bookName}</Text>
                    </Card>
                    <Card>
                        <Text>Reason for Request: {this.state.reasonForRequest}</Text>
                    </Card>
                </View>
                <View style={{flex: 0.3}}>
                    <Card title="Receiver Information" titleStyle={{fontSize:20}}>
                        <Card>
                            <Text>Name: {this.state.receiver_name}</Text>
                        </Card>
                        <Card>
                            <Text>Receiver Contact: {this.state.receiver_contact}</Text>
                        </Card>
                        <Card>
                            <Text>Receiver Address: {this.state.receiver_address}</Text>
                        </Card>
                    </Card>
                    <TouchableOpacity styles={styles.donate_button}>
                        <Text style={styles.donate_button_text}>I WANT TO DONATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    donate_button: {
        height: 20,
        width: 40,
        backgroundColor: "orange",
    },
    donate_button_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    }
})