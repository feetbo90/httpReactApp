import React, { Component } from 'react';

import './NewPost.css';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        status: false
    }

    // addPostHandler = () => {
    //     const post = {
    //         title: this.state.title,
    //         body: this.state.content,
    //         userId: 101
    //     }
    //     Axios.post('/posts', post)
    //     .then(response => {
    //         console.log(response);
    //     })
    // }

    addPost = () => {
        
        //console.log(data);

        axios.post('/posts', {title: this.state.title , body: this.state.body, author: this.state.author})
        .then(response => {
            this.setState({status: true})
            console.log(response);
        })
    }


    render () {

        if(this.state.status) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={() => this.addPost()}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;