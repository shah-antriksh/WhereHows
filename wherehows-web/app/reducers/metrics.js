import { initializeState, createUrnMapping, receiveEntities, createPageMapping } from 'wherehows-web/reducers/entities';
import { ActionTypes } from 'wherehows-web/actions/metrics';


/**
 * Sets the default initial state for metrics slice. Appends a byName property to the shared representation.
 * @type {Object}
 */
const initialState = Object.assign({}, initializeState(), {
  byName: {}
});

/**
 * Takes the `metrics` slice of the state tree and performs the specified reductions for each action
 * @param {Object} state = initialState slice of the state tree this reducer is responsible for
 * @param {Object} action Flux Standard Action representing the action to be preformed on the state
 * @prop {String} action.type actionType
 * @return {Object}
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Action indicating a request for metrics by page
    case ActionTypes.SELECT_PAGED_METRICS:
    case ActionTypes.REQUEST_PAGED_METRICS:
      return Object.assign({}, state, {
        query: Object.assign({}, state.query, {
          page: action.payload.page
        }),
        baseURL: action.payload.baseURL || state.baseURL,
        isFetching: true
      });
    // Action indicating a receipt of metrics by page
    case ActionTypes.RECEIVE_PAGED_METRICS:
      return Object.assign({}, state, {
        isFetching: false,
        byUrn: createUrnMapping('metrics')(state.byUrn, action.payload),
        byId: receiveEntities('metrics')(state.byId, action.payload),
        byPage: createPageMapping('metrics')(state.byPage, action.payload)
      });

    default:
      return state;
  }
};