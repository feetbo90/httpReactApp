import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId: 1,
        status: false
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

    selectId = (id) => {
        this.setState({selectedPostId: id})
    } 

    addPostHandler = (data) => {
        
        //console.log(data);

        axios.post('/posts', data)
        .then(response => {
            this.setState({status: true})
            console.log(response);
        })
    }

    deletePostHandler = (id) => {
        axios.delete('/posts/' + id)
        .then(response => {
            this.setState({status: true})
            console.log(response);
        })
    }

    componentDidUpdate() {
        
        if(this.state.status) {
            console.log("componentDidUpdate")
            axios.get('/posts')
        .then(response => {
            //const post = response.data.slice(0,5);
            const updates = response.data.map(post => {
                return {
                    ...post, author: "Anshor"
                }
            });
            this.setState({posts: updates, status: false})
        });

        }
    }

    render () {
        const posts = this.state.posts.map( post => {
            return <Post title={post.title}
                         key={post.id}
                         author={post.author}
                         clicked={()=>this.selectId(post.id)}
                         />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId}
                        deletePost={(id) => this.deletePostHandler(id)}
                        />
                </section>
                <section>
                    <NewPost 
                        addPost={(data)=> this.addPostHandler(data)}/>
                </section>
            </div>
        );
    }
}

export default Blog;