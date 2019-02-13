import React from 'react';
import axios from 'axios';

class User extends React.Component {
    state = {
        user: {},
        posts: []
      }
    
      componentDidMount(){
        axios
          .get('http://localhost:4000/api/posts')
          .then(res => {
            this.setState({
              posts: res.data.posts.filter(x => `${x["user_id"]}` === `${this.props.match.params.id}`)
            })
            return axios.get(`http://localhost:4000/api/users/${this.props.match.params.id}`);
          })
          .then(res => {
              this.setState({
                  user: res.data.user
              })
          })
          .catch(err => console.log(err))
      }

      render(){
        return (
            <div className='user'>
            <h1>{this.state.user.name}</h1>
            {this.state.posts.length > 0 &&
            this.state.posts.map(post => {
                return (
                    <div className="post" key={post.user_id + post.id}>
                    {post.text}
                    </div>
                );
            })
            }
          </div>
        );
      }
}

export default User;