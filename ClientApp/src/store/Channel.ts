import { Action, Reducer } from 'redux';
import axios,{AxiosInstance} from 'axios'
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ChannelState {
    isLoading: boolean;
    channel: string;
    channelData: ChannelData[];
}

export interface ChannelData {
    itemName: string;
    itemDesc: string;
    itemExtra: string;
    itemPrice: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestChannelAction {
    type: 'REQUEST_CHANNEL';
    channel: string;
}

interface ReceiveChannelAction {
    type: 'RECEIVE_CHANNEL';
    channel: string;
    ChannelData: ChannelData[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestChannelAction | ReceiveChannelAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestChannelData: (channel: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.channel && channel !== appState.channel.channel) {
            axios(`Channel`, {
                params: {
                    Channel :channel
                }
            }).then(response => response.data as Promise<ChannelData[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_CHANNEL', ChannelData: data, channel: channel });
                }).catch(error => console.log(error.response));

            dispatch({ type: 'REQUEST_CHANNEL', channel: channel });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ChannelState = { channelData: [], channel: '', isLoading: false };

export const reducer: Reducer<ChannelState> = (state: ChannelState | undefined, incomingAction: Action): ChannelState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CHANNEL':
            return {
                channel: action.channel,
                channelData: state.channelData,
                isLoading: true
            };
        case 'RECEIVE_CHANNEL':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.channel === state.channel) {
                return {
                    channel: action.channel,  
                    channelData: action.ChannelData,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
