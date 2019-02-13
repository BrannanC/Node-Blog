import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = {
        users: []
      }
    
      componentDidMount(){
        axios
          .get('http://localhost:4000/api/users')
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
            {this.state.users.length > 0 &&
            this.state.users.map(user => {
              return (
                <div className="user" key={user.id + user.name}>
                  {user.name}
                </div>
              );
            })
            }
          </div>
        );
      }
}

export default Users;