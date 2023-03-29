import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

const infoData = {
	refetchQueries: {
		description:
			'The refetchQueries method can be used to refetch queries based on certain conditions.',
		shortNotes: ``,
		code: `// refetch all queries:
await queryClient.refetchQueries()
		
// refetch all stale queries:
await queryClient.refetchQueries({ stale: true })
		
// refetch all active queries partially matching a query key:
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
		
// refetch all active queries exactly matching a query key:
await queryClient.refetchQueries({ queryKey: ['posts', 1], type: 'active', exact: true })`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientrefetchqueries',
	},
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
	resetQueries: {
		description: `The resetQueries method can be used to reset queries in the cache to their initial state based on their query keys or any other functionally accessible property/state of the query.
		This will notify subscribers — unlike clear, which removes all subscribers — and reset the query to its pre-loaded state — unlike invalidateQueries. If a query has initialData, the query's data will be reset to that. If a query is active, it will be refetched.`,
		shortNotes: ``,
		code: `queryClient.resetQueries({ queryKey, exact: true })`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientresetqueries',
	},
	removeQueries: {
		description:
			'The removeQueries method can be used to remove queries from the cache based on their query keys or any other functionally accessible property/state of the query.',
		shortNotes: ``,
		code: `queryClient.removeQueries({ queryKey, exact: true })`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientremovequeries',
	},
	clear: {
		description: 'The clear method clears all connected caches.',
		shortNotes: ``,
		code: `queryClient.clear()`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientclear',
	},
	fetchQuery: {
		description: `fetchQuery is an asynchronous method that can be used to fetch and cache a query. It will either resolve with the data or throw with the error. Use the prefetchQuery method if you just want to fetch a query without needing the result.

		If the query exists and the data is not invalidated or older than the given staleTime, then the data from the cache will be returned. Otherwise it will try to fetch the latest data.
		
		The difference between using fetchQuery and setQueryData is that fetchQuery is async and will ensure that duplicate requests for this query are not created with useQuery instances for the same query are rendered while the data is fetching.
		`,
		shortNotes: ``,
		code: `try {
	const data = await queryClient.fetchQuery({ queryKey, queryFn, staleTime: 10000 })
} catch (error) {
	console.log(error)
}`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientfetchquery',
	},
	ensureQueryData: {
		description: `ensureQueryData is an asynchronous function that can be used to get an existing query's cached data. If the query does not exist, queryClient.fetchQuery will be called and its results returned.`,
		shortNotes: ``,
		code: `const data = await queryClient.ensureQueryData({ queryKey, queryFn })`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientensurequerydata',
	},
	setQueryData: {
		description: `setQueryData is a synchronous function that can be used to immediately update a query's cached data. If the query does not exist, it will be created. If the query is not utilized by a query hook in the default cacheTime of 5 minutes, the query will be garbage collected. To update multiple queries at once and match query keys partially, you need to use queryClient.setQueriesData instead.

		The difference between using setQueryData and fetchQuery is that setQueryData is sync and assumes that you already synchronously have the data available. If you need to fetch the data asynchronously, it's suggested that you either refetch the query key or use fetchQuery to handle the asynchronous fetch.`,
		shortNotes: ``,
		code: `queryClient.setQueryData(queryKey, updater)`,
		link: 'https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientsetquerydata',
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
					onMouseOver={() => setInfo('refetchQueries')}
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
					onMouseOver={() => setInfo('resetQueries')}
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
					onMouseOver={() => setInfo('removeQueries')}
				>
					removeQueries
				</button>
				<br />
				<button
					onClick={() => {
						queryClient.clear();
					}}
					type='button'
					onMouseOver={() => setInfo('clear')}
				>
					clear
				</button>
				<br />
				<button
					onClick={() => {
						queryClient.fetchQuery({ queryKey: [queryKeyName] });
					}}
					type='button'
					onMouseOver={() => setInfo('fetchQuery')}
				>
					fetchQuery
				</button>
				<br />
				<button
					onClick={() => {
						queryClient.ensureQueryData({ queryKey: [queryKeyName] });
					}}
					type='button'
					onMouseOver={() => setInfo('ensureQueryData')}
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
					onMouseOver={() => setInfo('setQueryData')}
				>
					setQueryData
				</button>
			</div>
			<div className='info-box'>
				{info ? (
					<>
						<div className='info-box-title'>#queryClient.{info}</div>
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
