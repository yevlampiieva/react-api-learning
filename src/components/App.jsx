import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';

export default class App extends Component {
  state = {
    pokemonName: '',
  };

  handleFormSubmit = pokemonName => {
    this.setState({pokemonName})
  };
  render() {
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
        {/* <ToastContainer autoClose={3000} /> */}
        
      </div>
    );
  }
}

// Варіант коли треба на маунті щось зафечити:
// export default class App extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//   };
//   componentDidMount() {
//     this.setState({ loading: true });
//     fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//       .then(res => res.json())
//       .then(pokemonRes => this.setState({ pokemon: pokemonRes }))
//       .finally(() => this.setState({ loading: false }));
//   }
//   render() {
//     return (
//       <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
//         {this.state.loading && <h1>Loading...</h1>}
//         {this.state.pokemon && (
//           <div>
//             Here will be Pokemon after fetch and when we will write it to state
//             <div>{this.state.pokemon.name}</div>
//           </div>
//         )}

//         {/* <ToastContainer autoClose={3000} /> */}
//       </div>
//     );
//   }
// }
