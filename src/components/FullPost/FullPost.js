import React, { Component } from 'react';

import './FullPost.css';
import Axios from '../../axios';

class FullPost extends Component {

    state = {
        posts: null
    }
    componentDidUpdate() {
        
        if(!this.state.posts || (this.state.posts && this.state.posts.id !== this.props.id))
        {   
            Axios.get('/posts/'+ this.props.id)
            .then(response => {
                this.setState({posts: response.data})
            }); 
        }
    }

    render () {
        let post = <p>Please select a Post!</p>;
        
        if(this.state.posts) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.posts.title}</h1>
                    <p>{this.state.posts.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={()=> this.props.deletePost(this.state.posts.id) }>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;