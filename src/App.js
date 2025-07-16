import React, { useState } from 'react';
  import UserList from './components/UserList';
   import ClaimAndLeaderboard from './components/ClaimAndLeaderboard';

const App = () => {
    const [selectedUserId, setSelectedUserId] = useState('');

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: 'blue' }}>Point Claim System</h1>
            <UserList onUserSelect={setSelectedUserId} />
            {selectedUserId && <ClaimAndLeaderboard selectedUserId={selectedUserId} />}
        </div>
      );
  };

export default App;
  