import React from 'react'
import {ActivityIndicator, StyleSheet, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component{


    constructor(props) {
        super(props)
        this.searchedText = "",
        this.totalPages = 0,
        this.page = 0,
        this.state = { 
            films: [], 
            isLoading: false, 
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
          this.setState({ isLoading: true })
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
              })
          })
        }
    }
    
    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: []
        }, ()=>{
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
    }    

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }
    
    
    render(){
        const styles = StyleSheet.create({
            search: {
                flex: 1,
                backgroundColor: '#EFEEEE',
                padding: 15,
   
            },
            inputs: {
                flexDirection:'row',
                height: 50,
            },            
            textinput: {
                flex: 1,
                backgroundColor: '#EFEEEE',
                color: '#451235',
                padding: 15,
                borderColor: '#F9A26C',
                borderWidth: 1,
            },
            button: {
                flex: 1,  
                textAlign: 'center',
                textAlignVertical: 'center',
            },

            listefilms: {
                marginTop :15,
                flex: 9,
                flexDirection: 'column',

            },
            flatlist: {
                flex: 1,
                flexDirection:'row',

            },
            loading_container: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 100,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }            
    });    
    // console.log(this.props)
        return(
            <View style={styles.search}>
                <View style={styles.inputs}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Titre du film'
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._searchFilms()}
                    />
                    <Button title='Rechercher' onPress={() => this._searchFilms()}/>                    
                </View>

                <View style={styles.listefilms}>

                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    renderItem={({item}) =>
                        <FilmItem
                        film={item}
                        // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                        />
                    }                   
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                            this._loadFilms()
                        }
                    }}
                    
                />
                </View>
                { this.state.isLoading ?
                    <View style={styles.loading_container}>
                        <ActivityIndicator size='large' />
                    </View>
                    : null
                }
            </View>
            
        )

    }
}

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }

export default connect(mapStateToProps)(Search)