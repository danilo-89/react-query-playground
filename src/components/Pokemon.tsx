import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getErrorMessage } from '../utils/errorMessageHandling';

interface IProps {
	enabled: boolean;
}

const Pokemon = ({ enabled }: IProps) => {
	const queryInfo = useQuery({
		queryKey: ['pokemon'],
		queryFn: async () => {
			await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));

			// if (true) {
			// 	throw new Error('Test error!');
			// }

			return axios
				.get('https://pokeapi.co/api/v2/pokemon?limit=5')
				.then((res) => res.data.results);
		},

		// refetchOnWindowFocus: false,
		// staleTime represents time duration considering query as fresh, when it expires, if, for eg. refetchOnWindowFocus is true, it will refetch data (default is 0)
		staleTime: 5000,
		cacheTime: 5000,
		// keepPreviousData: true,
		enabled,
	});

	// https://pokeapi.co/api/v2/pokemon-species/aegislash
	// console.log(queryInfo);

	return (
		<>
			<div className='title'>queryKey: pokemon</div>
			<div className='states'>
				<div>
					dataUpdatedAt:{' '}
					<span className='message'>
						{queryInfo.dataUpdatedAt
							? new Date(queryInfo.dataUpdatedAt).toLocaleString(undefined, {
									hour: 'numeric',
									minute: 'numeric',
									second: 'numeric',
							  })
							: null}
					</span>
				</div>
				<div>
					isFetchedAfterMount:{' '}
					<span className='message'>
						{queryInfo.isFetchedAfterMount ? 'true' : null}
					</span>
				</div>
				<div>
					isInitialLoading:{' '}
					<span className='message'>
						{queryInfo.isInitialLoading ? 'true' : null}
					</span>
				</div>
				<div>
					isLoading:{' '}
					<span className='message'>{queryInfo.isLoading ? 'true' : null}</span>
				</div>
				<div>
					isFetching:{' '}
					<span className='message'>
						{queryInfo.isFetching ? 'true' : null}
					</span>
				</div>
				<div>
					isRefetching:{' '}
					<span className='message'>
						{queryInfo.isRefetching ? 'true' : null}
					</span>
				</div>
				<div>
					status: <span className='message'>{queryInfo.fetchStatus}</span>
				</div>
				<div>
					fetchStatus: <span className='message'>{queryInfo.status}</span>
				</div>
			</div>

			{queryInfo.isError ? (
				getErrorMessage(queryInfo.error)
			) : (
				<div className='App'>
					{queryInfo.data?.map((result: any) => {
						return <div key={result.name}>{result.name}</div>;
					})}
					<br />
				</div>
			)}
		</>
	);
};

export default Pokemon;
