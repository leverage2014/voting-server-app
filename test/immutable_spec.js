import { expect } from 'chai';
import { List } from 'immutable';

describe('immutability', () => {
	describe('A number', () => {
		function increment(currentState){
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 1;
			let nextState = increment(state);

			expect(state).to.equal(1);
			expect(nextState).to.equal(2);
		});
	});

	describe('A List', () => {
		function addMovie(currentState, movie){
			return currentState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Transportting', '28 days later');
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.Equal(List.of(
				'Transportting', 
				'28 days later', 
				'Sunshine'
			));

			expect(state).to.Equal(List.of(
				'Transportting', 
				'28 days later'
			));
		});
	});

	describe('A tree', () => {
		function addMovie(currentState, movie){
			return currentState.set(
				'movie',
				currentState.get('movie').push(movie)
			);
		}

		function AddMovie(currentState, movie){
			return currentState.update('movie', movies => movies.push(movie));
		}

		it('is immutable', () => {
			let state = Map({
				movies: List.of('Transportting', '28 days later')
			});

			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.equal(Map({
				movies: List.of('Transportting', '28 days later', 'Sunshine')
			}));

			expect(state).to.equal(Map({
				movies: List.of('Transportting', '28 days later')
			}));
		});
	});
});