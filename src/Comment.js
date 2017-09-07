import React from 'react'
import { 
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'

const DEFAULT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/fsvmusic-69c5c.appspot.com/o/default-avatar-ponsy-deer.png?alt=media&token=77bca334-6b93-449d-8dc0-e9e79893cd9e'
const AVATAR_SIZE = 32

const Comment = (props) =>
    <View style={styles.comment}>
        {
            props.avatar ?
            <Image style={styles.avatar} source={{uri: props.avatar}} /> :
            <Image style={styles.avatar} source={{uri: DEFAULT_AVATAR}} />
        }
        <Text style={styles.text}>{props.text}</Text>
    </View>


const styles = StyleSheet.create({
    comment: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:{
       fontSize: 16, 
       margin: 10,
    },
    avatar:{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE /2,
    }
})

export default Comment