import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useReducer, useState } from 'react';
import Pokemon from './components/Pokemon';
import ControlBoard from './components/ControlBoard';

// import { ReactQueryDevtools } from 'react-query-devtools';

function App() {
	const [show, toggle] = useReducer((d) => !d, true);
	const [enabled, setEnabled] = useState(false);

	return (
		<div id='app'>
			<div>
				<button onClick={toggle}>{show ? 'Hide' : 'Show'}</button>
				<div>
					<label htmlFor='pokemonEnabled'>fetch enabled</label>

					<input
						id='pokemonEnabled'
						type='checkbox'
						checked={enabled}
						onChange={() => setEnabled((curr) => !curr)}
					/>
				</div>
				{show && <Pokemon enabled={enabled} />}
			</div>
			<ControlBoard />
		</div>
	);
}

export default App;

// refetch is just a hardcore "fetch now, no questions asked" (at leat the one returned from useQuery). refetchQueries still respects enabled:false for example.
