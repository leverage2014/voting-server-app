import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {
			type: 'SET_ENTRIES', 
			entries: ['Trainspotting']
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	});

	it('handles NEXT', () => {
		const initialState = fromJS({
			entries: ['Trainspotting', '28 days later']
		});
		const action = { type: 'NEXT' };
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later']
			},
			entries: []
		}));
	});

	it('handles VOTE', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later']
			},
			entries: []
		});
		const action = {
			type: 'VOTE',
			entry: 'Trainspotting'
		};

		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					Trainspotting: 1
				}
			},
			entries: []
		}));
	});

});