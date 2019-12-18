import React , { Component } from 'react';
import Post from '../Post/Post';
import axios from '../../axios';
import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends Component {

    state = {
        posts : []
    }

    componentDidMount() {
            axios.get('/posts')
            .then(response => {
                //const post = response.data.slice(0,5);
                const updates = response.data.map(post => {
                    return {
                        ...post, author: "Anshor"
                    }
                });
                this.setState({posts: updates})
            });
    
        }

    render () {
        const posts = this.state.posts.map( post => {
                return (<Link to={'/' +post.id} key={post.id}>
                            <Post title={post.title}
                                key={post.id}
                                author={post.author}
                                //  clicked={()=>this.selectId(post.id)}
                            />
                        </Link>)
            })
        return (
            <div className="Posts"> 
                {posts}        
            </div>
        );

    }

}

export default Posts;