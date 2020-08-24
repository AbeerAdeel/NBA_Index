import ApolloClient from 'apollo-boost';


// "http://localhost:5000/graphql" use this as uri if changed api locally

export default new ApolloClient({
  uri: "https://blooming-inlet-37777.herokuapp.com/graphql",
});