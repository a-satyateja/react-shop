import React, { Component, Fragment } from 'react'
import { ProgressBar } from 'react-bootstrap'
import firebase from 'firebase/app'
import { db } from '../../config/firebase'
import FileUploader from "react-firebase-file-uploader"
import { Container } from 'react-bootstrap'
import CategoryDropdown from './CategoryDropdown'
import SizesDropdown from './SizeDropdown'
const container = {
    maxWidth: '600px',
    marginTop: '60px'
}
export default class Index extends Component {
    state = {
        categories: [],
        sizes:[],
        alertMessage: null,
        showAlert: false,
        alertType: 'success',
        filenames: [],
        downloadURLs: [],
        isUploading: false,
        uploadProgress: 0
    }
    alertTimeout = null
    
    componentDidMount() {
        this.getCategories()
        this.getSizes()
    }
    
    handleUploadStart = () => this.setState({
        isUploading: true,
        uploadProgress: 0
    });

    handleProgress = progress => this.setState({
        uploadProgress: progress
    });

    handleUploadError = error => {
    this.setState({
        isUploading: false
        // Todo: handle error
    });
    console.error(error);
    };

    handleUploadSuccess = async filename => {
    const downloadURL = await firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL();

    this.setState(oldState => ({
        filenames: [...oldState.filenames, filename],
        downloadURLs: [...oldState.downloadURLs, downloadURL],
        uploadProgress: 100,
        isUploading: false
    }));
    };

    getCategories = () => {
        db.collection("category")
        .onSnapshot(snapshot => {
            const categories = []
            snapshot.forEach(doc => {
                const obj = {
                    id: doc.id,
                    name: doc.data()
                }
                categories.push(obj)
            })
            this.setState({ categories })
        });
    }

    getSizes = () => {
        db.collection("sizes")
        .onSnapshot(snapshot => {
            const sizes = []
            snapshot.forEach(doc => {
                const obj = {
                    id: doc.id,
                    name: doc.data()
                }
                sizes.push(obj)
            })
            this.setState({ sizes })
        });
    }

    render() {
        return (
            <Fragment>
                <Container style={container}>
                    <CategoryDropdown categories={this.state.categories}/>
                    <SizesDropdown sizes={this.state.sizes} />
                    <button onClick={this.handleUpload}>Upload Images</button>
                    <FileUploader
                        accept="image/*"
                        name="image-uploader-multiple"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                        />

                        <ProgressBar now={this.state.uploadProgress}  label={`${this.state.uploadProgress}%`}/>

                        <p>Filenames: {this.state.filenames.join(", ")}</p>

                        <div>
                        {this.state.downloadURLs.map((downloadURL, i) => {
                            return <img key={i} src={downloadURL} />;
                        })}
                    </div>
                </Container>
            </Fragment>
        )
    }
}