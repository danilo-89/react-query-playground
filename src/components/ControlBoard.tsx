import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

const ControlBoard = () => {
	const queryClient = useQueryClient();
	const [queryKeyName, setQueryKeyName] = useState('pokemon');

	// console.log(queryClient);

	// if enabled: false, refetchQueries and invalidateQueries will not refetch automaticly

	return (
		<div>
			<select
				name='queryNames'
				value={queryKeyName}
				onChange={(e) => setQueryKeyName(e.target.value)}
			>
				<option value='pokemon'>pokemon</option>
			</select>
			<div className='info'>* respects enabled:false</div>

			<button
				onClick={() => {
					queryClient.removeQueries({
						queryKey: [queryKeyName],
						// type: 'inactive',
					});
				}}
				type='button'
			>
				removeQueries
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.refetchQueries({
						queryKey: [queryKeyName],
						// type: 'active',
					});
				}}
				type='button'
			>
				refetchQueries*
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.invalidateQueries({
						queryKey: [queryKeyName],
						// type: 'active',
					});
				}}
				type='button'
			>
				invalidateQueries*
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.resetQueries({
						queryKey: [queryKeyName],
						// type: 'active',
					});
				}}
				type='button'
			>
				reset
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.clear();
				}}
				type='button'
			>
				clear
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.fetchQuery({ queryKey: [queryKeyName] });
				}}
				type='button'
			>
				fetchQuery
			</button>
			<br />
			<button
				onClick={() => {
					queryClient.ensureQueryData({ queryKey: [queryKeyName] });
				}}
				type='button'
			>
				ensureQueryData
			</button>
		</div>
	);
};

export default ControlBoard;
