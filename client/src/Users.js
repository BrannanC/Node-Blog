import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Users extends React.Component {
    state = {
        users: []
      }
    
      componentDidMount(){
        axios
          .get('/api/users')
          .then(res => {
            this.setState({
              users: res.data.user
            })
          })
          .catch(err => console.log(err))
      }

      render(){
        return (
            <div className='Users'>
                <h3>Characters</h3>
                <div className="user-list">
                    {this.state.users.length > 0 &&
                    this.state.users.map(user => {
                    return (
                        <div className="user" key={user.id + user.name}>
                        <Link to={`/users/${user.id}`} >{user.name}</Link>
                        </div>
                    );
                    })
                    }
                </div>
            </div>
        );
      }
}

export default Users;