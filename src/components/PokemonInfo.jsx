import { Component } from 'react';
import PokemonErrorView from './PokemonErrorView';
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import pokemonApi from '../services/pokemon-api';

// Варіант коду після рефакторингу:
// 'idle' - стан простій
// 'pending' - стан очікується виконання
// 'resolved' - стан виконано з результатом добре
// 'rejected' - стан відхилено
export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      console.log('Pokemon name is changed');

      this.setState({ status: 'pending' });

      pokemonApi
        .fetchPokemon(nextName)
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === 'idle') {
      return <div>Please input Pokemon name</div>;
    }

    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

// Варіант кода до рефакторингу:
// export default class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       console.log('Pokemon name is changed');

//       this.setState({ loading: true, pokemon: null });
//       fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(
//             new Error(`Sorry, there isn't pokemon ${nextName}`)
//           );
//         })
//         .then(pokemon => this.setState({ pokemon }))
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   render() {
//     const { pokemon, loading, error } = this.state;
//     const { pokemonName } = this.props;

//     return (
//       <div>
//         {error && <h1>{error.message}</h1>}
//         {loading && <div>Loading...</div>}
//         {!pokemonName && <div>Please input Pokemon name</div>}
//         {pokemon && (
//           <div>
//             <p>{pokemon.name}</p>
//             <img
//               src={pokemon.sprites.other['official-artwork'].front_default}
//               alt={pokemon.name}
//               width="240"
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
