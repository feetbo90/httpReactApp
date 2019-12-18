import React, { Component } from 'react';

import './FullPost.css';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';

class FullPost extends Component {

    state = {
        posts: null,
        status: false
    }
    componentDidMount() {
        
        if(!this.state.posts || (this.state.posts && this.state.posts.id !== this.props.match.params.id))
        {   
            axios.get('/posts/'+ this.props.match.params.id)
            .then(response => {
                this.setState({posts: response.data})
            }); 
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
        .then(response => {
            this.setState({status: true})
            console.log(response);
            
        })
    }


    render () {
        let post = <p>Please select a Post!</p>;
        if(this.state.status) {
            return <Redirect to="/"/>;
        }
        if(this.state.posts) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.posts.title}</h1>
                    <p>{this.state.posts.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={()=> this.deletePostHandler() }>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;