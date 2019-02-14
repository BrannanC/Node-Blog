import React from 'react';
import axios from 'axios';

class User extends React.Component {
    state = {
        user: {},
        posts: [],
        newPost: {
            text: '',
            user_id: ''
        }
      }
    
      componentDidMount(){
        axios
          .get(`http://localhost:4000/api/users/posts/${this.props.match.params.id}`)
          .then(res => {
            this.setState({
                posts: res.data.posts
            })
            return axios.get(`http://localhost:4000/api/users/${this.props.match.params.id}`);
          })
          .then(res => {
              this.setState({
                  user: res.data.user,
                  newPost: {
                      text: '',
                      user_id: res.data.user.id
                  }
              })
          })
          .catch(err => console.log(err))
      }

      changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
          newPost: {...prevState.newPost,
            [name]: value
          }
        }))
      }

      addPost = e => {
          e.preventDefault();
          axios
            .post('/api/posts', this.state.newPost)
            .then(res => {
                this.setState(prevState => ({
                    posts: [...prevState.posts, res.data.post],
                    newPost: {
                        ...prevState.newPost,
                        text: ''
                    }
                }))
            })
            .catch()
      }

      deletePost = (e, id) => {
          e.preventDefault();
          axios
            .delete(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                this.setState(prevState => ({
                    posts: prevState.posts.filter(x => x.id !== id)
                }))
            })
            .catch(err => console.log(err))
      }

      render(){
        return (
            <div className='user'>
            <form onSubmit={this.addPost}>
                <input 
                    type="text" 
                    placeholder="New post..." 
                    name="text" 
                    value={this.state.newPost.text} 
                    onChange={this.changeHandler}
                />
            </form>
                <h3>{this.state.user.name}</h3>
                <div className="post-list">
                    {this.state.posts.length > 0 &&
                    this.state.posts.map(post => {
                        return (
                            <div className="post" key={`${post.postedBy}${post.id}`}>
                            <p>"{post.text}"</p>
                            <button onClick={e => this.deletePost(e, post.id)}>[X]</button>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        );
      }
}

export default User;