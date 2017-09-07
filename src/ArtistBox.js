/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {firebaseDatabase, firebaseAuth} from './firebase'
import Share, {ShareSheet, Button} from 'react-native-share';


export default class ArtistBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            liked: false,
            likesCount: 0,
            commentsCount:0,
            commented: false,
            artistCountComments: 0,
        };
    }

    handledPress = () => {
        this.toggleLike(!this.props)
    }

    getArtistRef = () => {
        //console.log("this", this.props);
        const {id} = this.props
        return firebaseDatabase.ref(`artist/${id}`) 
    }

    getArtistCountCommentRef = () => {
        const {id} = this.props
        return firebaseDatabase.ref(`artistCountComments/${id}`)
      }

    getArtistsCommentsRef = () => {
        const { id } = this.props
        return firebaseDatabase.ref(`comments/${id}`)
      }

    toggleLike = (liked) =>  {

        const {uid} = firebaseAuth.currentUser
        
        this.getArtistRef().transaction((artist) => {

            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likesCount--;
                    artist.likes[uid] = false;
                } else {
                    artist.likesCount++;
                    if (!artist.likes) {
                    artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            /* todo esto es lo mismo que la linea 59,60 ES5
            const likes = {}
            likes[uid] = true*/

            return artist || {
                likesCount: 1,
                likes: {
                    [uid]: true
                }
            };
        });
    } 
   
    render() {

        const styles = StyleSheet.create({
            
            image:{
                width: 150,
                height: 150,
            },
            
            artistBox:{
                margin: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOpacity: .2,
                shadowOffset: {
                    height:  1,
                    width: -2
                },
                elevation: 2
            },
            
            info:{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            name:{
                fontSize: 20,
                marginTop: 10,
                color: '#333'
            
            },
            row:{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                marginHorizontal: 40,
            },
            iconContainer:{
                flex: 1,
                alignItems: 'center'
            },
            count: {
                color: 'gray'
            }
        
        });

        const {image,name,url, likesCount = 0,commentsCount=0, commented=false } = this.props
        const {liked=false} = this.state
        let shareOptions = {
            title: name,
            message: `Escucha a ${name}`,
            url: url,
            subject: "Share Link" //  for email
            
        }

        const likeIcon = this.props.liked ? 
            <Icon name="ios-heart" size={30} color="#e74c3c" /> :
            <Icon name="ios-heart-outline" size={30} color="gray" />

        const commentIcon = this.props.commented ? 
            <Icon name="ios-chatbubbles" size={30} color="#3498db" /> :
            <Icon name="ios-chatbubbles-outline" size={30} color="gray" />
        
     
        
        return (
            <View style={styles.artistBox}>
                <Image style={styles.image} source= {{ uri: image }} />
                <View style={styles.info}>                
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={this.handledPress}>
                                {likeIcon}
                            </TouchableOpacity>
                            <Text style={styles.count}>{likesCount}</Text>
                        </View>
                        <View style={styles.iconContainer}>                  
                            {commentIcon}                    
                            <Text style={styles.count}>{commentsCount}</Text>
                        </View> 
                        <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={()=>{Share.open(shareOptions);}}>
                            <Icon name="md-share" size={30} color="#2ecc71" />
                        </TouchableOpacity>
                        <Text style={styles.count} >Share</Text>
                        </View> 
                    </View>                          
                </View>        
            </View>
        );
    }
}
