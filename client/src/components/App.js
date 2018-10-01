import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

const App = () => (
  <div className="App">
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>
        console.log(data);
        return <div>Recipes</div>
      }}
    </Query>
  </div>
);

export default App;
