import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

const infoData = {
	invalidateQueries: {
		description:
			'The invalidateQueries method can be used to invalidate and refetch single or multiple queries in the cache based on their query keys or any other functionally accessible property/state of the query. By default, all matching queries are immediately marked as invalid and active queries are refetched in the background.',
		shortNotes: (
			<ul>
				<li>
					If you do not want active queries to refetch, and simply be marked as
					invalid, you can use the refetchType: 'none' option.
				</li>
				<li>
					If you want inactive queries to refetch as well, use the refetchType:
					'all' option
				</li>
			</ul>
		),
		code: `await queryClient.invalidateQueries({
	queryKey: ['posts'],
	exact,
	refetchType: 'active',
}, { throwOnError, cancelRefetch })
		`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientinvalidatequeries',
	},
};

const ControlBoard = () => {
	const queryClient = useQueryClient();
	const [queryKeyName, setQueryKeyName] = useState('pokemon');
	const [info, setInfo] = useState<keyof typeof infoData | undefined>(
		undefined
	);

	// console.log(queryClient);

	// if enabled: false, refetchQueries and invalidateQueries will not refetch automaticly

	return (
		<>
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
						queryClient.refetchQueries({
							queryKey: [queryKeyName],
							// type: 'active',
						});
					}}
					onMouseOver={() => setInfo(undefined)}
					type='button'
				>
					refetchQueries*
				</button>
				<br />
				<button
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: [queryKeyName],
							// refetchType: 'none',
						});
					}}
					type='button'
					onMouseOver={() => setInfo('invalidateQueries')}
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
					resetQueries
				</button>
				<br />
				<button
					onClick={() => {
						queryClient.removeQueries({
							queryKey: [queryKeyName],
							// type: 'active',
						});
					}}
					type='button'
				>
					removeQueries
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
				<br />
				<button
					onClick={() => {
						queryClient.setQueryData([queryKeyName], (oldData: any) => [
							...oldData,
							{ name: 'newName' },
						]);
					}}
					type='button'
				>
					setQueryData
				</button>
			</div>
			<div className='info-box'>
				{info ? (
					<>
						<div>{infoData?.[info]?.description}</div>
						<br />
						<div className='info-box-short'>{infoData?.[info]?.shortNotes}</div>
						<br />
						<div>
							<code>{infoData?.[info]?.code}</code>
						</div>
						<br />
						<div>
							<a
								href={infoData?.[info]?.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								documentation
							</a>
						</div>
					</>
				) : null}
			</div>
		</>
	);
};

export default ControlBoard;
