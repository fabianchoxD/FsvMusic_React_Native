import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    TouchableOpacity,
    View,
} from 'react-native';

import ArtistBox from './ArtistBox';
import { Actions } from 'react-native-router-flux';
import { firebaseDatabase, firebaseAuth } from './firebase';
import SearchBar from 'react-native-material-design-searchbar';


export default class ArtistList extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => {
                //return row1 !== row2;
                return true;
            }
        });

        this.state = {
            dataSource: ds,
            text: '',
            _data: [],
            liked: false,
        }
    }

    componentDidMount() {
        this.updateDataSource(this.props.artists);

        const { uid } = firebaseAuth.currentUser;

        firebaseDatabase.ref(`artist`).on('value', snapshot => {
            const artistsLikes = snapshot.val();

            //console.log('value', artistsLikes);

            if (artistsLikes) {
                const newData = this.state._data.map(item => {
                    return Object.assign(item, {
                        likesCount: artistsLikes[item.id] && artistsLikes[item.id].likesCount || 0,
                        liked: artistsLikes[item.id] && artistsLikes[item.id].likes && artistsLikes[item.id].likes[uid]
                    });
                });
                //console.log("newData", newData);

                this.updateDataSource(newData);
            }
        })

        firebaseDatabase.ref(`artistCountComments`).on('value', snapshot => {
            const artistsComments = snapshot.val();

            if (artistsComments) {
                const newData = this.state._data.map(item => {
                    return Object.assign(item, {
                        commentsCount: artistsComments[item.id] && artistsComments[item.id].commentsCount || 0,
                        commented: artistsComments[item.id] && artistsComments[item.id].commented && artistsComments[item.id].commented
                    });
                });

                this.updateDataSource(newData);
            }
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.artists !== this.props.artists) {
            this.updateDataSource(newProps.artists)
        }
    }

    updateDataSource = data => {
        this.setState({
            _data: data,
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
    }

    handlePress(artist) {
        Actions.artistDetail({ artist: artist })
    }

    filterSearch(text) {
        const newData = this.state._data.filter((artist) => {
            const itemData = artist.name.toUpperCase()
            const textData = this.state.text && this.state.text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            text: text,
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
    }

    render() {
        return (
            <View>
                <SearchBar
                    onSearchChange={(text) => this.filterSearch(text)}
                    height={50}
                    value={this.state.text}
                    onFocus={() => console.log('On Focus')}
                    onBlur={() => console.log('On Blur')}
                    placeholder={'Search...'}
                    autoCorrect={false}
                    padding={5}
                    returnKeyType={'search'}
                />

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(artist) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.handlePress(artist)}>
                                <ArtistBox {...artist} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'lightgray',
    },
});