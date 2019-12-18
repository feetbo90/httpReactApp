import React, { Component } from 'react';

import Posts from '../../components/Posts/Posts';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';
import { Link, Route } from 'react-router-dom';

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId: 1,
        status: false
    }

    // componentDidMount() {
    //     axios.get('/posts')
    //     .then(response => {
    //         //const post = response.data.slice(0,5);
    //         const updates = response.data.map(post => {
    //             return {
    //                 ...post, author: "Anshor"
    //             }
    //         });
    //         this.setState({posts: updates})
    //     });

    // }

    selectId = (id) => {
        this.setState({selectedPostId: id})
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
        // const posts = this.state.posts.map( post => {
        //     return <Post title={post.title}
        //                  key={post.id}
        //                  author={post.author}
        //                  clicked={()=>this.selectId(post.id)}
        //                  />
        // })
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: "/new-post"
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Route path="/:id" exact component={FullPost} />
                <Route path="/new-post" exact component={NewPost}/>
                {/* <section className="Posts">
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
                </section> */}
            </div>
        );
    }
}

export default Blog;