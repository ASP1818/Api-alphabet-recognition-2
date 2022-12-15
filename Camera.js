import React from "react"
import { Button, Image, View, Platform, AsyncStorage, ImagePickerIOS} from "react-native"
import * as imagepicker from "expo-image-picker"
import * as Permissons from "expo-permissons"

export default class PickImage{
    state = {
        image: null
    }

    render(){
        let{image} = this.state
        return(
            <View style = {{flex:1, alignItems: "center", justifyContent: "center"}}>
                <Button 
                    title="Pick an Image from camera roll" 
                    onPress={this._pickImage}
                ></Button>
            </View>
        )
    }
    componentDidMount(){
        this.getPermissionAsync()
    }

    getPermissionAsync = async()=>{
        if (Platform.OS !== "web"){
        const {staus} = await Permissions.askAsync(Permissons.CAMERA_ROLL)
        if(staus !== "granted"){
            alert("Sorry, We need camera roll Permissions to make this work")
        }
      }
    }

    uploadImage = async (url) => {
        const data = new FormData();
        let filename = uri.split("/")[uri.split("/").lenght - 1]
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const fileToUpload = {
            uri: uri,
            name: filename,
            type: type,
        };
        data.append("digit", fileToUpload);
        fetch("https://f292a3137990.ngrok.io/predict-digit", {
            method: "POST",
            METHOD: data,
            headers: {
                "content-type": "multipart/from-data",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success: ", result);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    };

    _pickImage = async() => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.cancelled) {
              this.setState({ image: result.data });
              console.log(result.uri)
              this.uploadImage(result.uri);
            }
          } catch (E) {
            console.log(E);
          }
        };
}


