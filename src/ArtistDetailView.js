/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import ArtistBox from './ArtistBox';
import CommentList from './CommentList';
import { getArtists } from './api-client';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseDatabase, firebaseAuth } from './firebase'

export default class ArtistDetailView extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    comments: [],
    likesCount: 0,
    commentsCount: 0,
    liked: false,
    commented: false
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment);
  }

  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment),
    })
  }

  handledSend = () => {

    // Create a new post reference with an auto-generated id 
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const idArtist = this.getArtistCountCommentRef()
    const ArtistCommentsRef = this.getArtistCommentsRef()

    var newCommentRef = ArtistCommentsRef.push();
    newCommentRef.set({
      text,
      userPhoto: photoURL,
      uid,
    });
    this.setState({ text: '' })

    idArtist.transaction(function (totalComments) {
      if (totalComments) {
        totalComments.commentsCount++
        commented: true
      }
      return totalComments || {
        commentsCount: 1,
        commented: true
      }
    });
  }

  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  getArtistCountCommentRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`artistCountComments/${id}`)
  }

  handleChangeText = (text) => this.setState({ text })

  componentWillReceiveProps(nextProps) {
    // update original states
    this.setState({
      liked: nextProps.liked,
      likesCount: nextProps.likesCount,
    });
  }

  render() {

    const artist = this.props
    const { comments } = this.state
    const { commentsCount, commented } = this.props
    //console.log("liked...", this.props.artist)
    return (

      <View style={styles.container}>
        <ArtistBox {...this.props.artist}

        />

        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Tell us about this Artist"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handledSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: (Platform.OS === 'android') ? 10 : 70,
  },
  inputContainer: {
    height: 50,
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    flex: 1,
  },
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  }
});