import { useReducer } from 'react';

import { getIncentives, createIncentive, redeemIncentive } from '@api/endpoints';

export enum Actions {
  SET_INCENTIVES = 'SET_INCENTIVES',
  SET_REDEEMED_INCENTIVE = 'SET_REDEEMED_INCENTIVE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR'
}

interface State {
  incentives: Incentive[];
  redeemedIncentive: Incentive | null;
  loading: boolean;
  error: string | null;
}

type Action = { type: Actions.SET_LOADING, payload: boolean }
  | { type: Actions.SET_ERROR, payload: string }
  | { type: Actions.SET_INCENTIVES, payload: Incentive[] }
  | { type: Actions.SET_REDEEMED_INCENTIVE, payload: Incentive }
 

export interface Hook extends State {
  list: () => Promise<void>;
  create: (code: string) => Promise<void>;
  redeem: () => Promise<void>;
}

const ERROR_MSG = 'Something went wrong!';

export const INITIAL_STATE: State = {
  incentives: [],
  redeemedIncentive: null,
  loading: false,
  error: null
}

const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
  case Actions.SET_LOADING:
    return { ...state, loading: true }
  case Actions.SET_ERROR:
    return { ...state, loading: false, error: action.payload }
  case Actions.SET_INCENTIVES:
    return { ...state, loading: false, error: null, incentives: action.payload }
  case Actions.SET_REDEEMED_INCENTIVE:
    return { ...state, loading: false, error: null, redeemedIncentive: action.payload }
  default:
    return state;
  }
};

const useIncentive = (): Hook => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const list = async () => {
    const incentives = await getIncentives();
    dispatch({ type: Actions.SET_LOADING, payload: true });

    if (incentives) {
      dispatch({ type: Actions.SET_INCENTIVES, payload: incentives })
    } else {
      dispatch({ type: Actions.SET_ERROR, payload: ERROR_MSG });
    }
  };

  const create = async (code: string) => {
    const incentives = await createIncentive(code);
    dispatch({ type: Actions.SET_LOADING, payload: true });

    if (incentives) {
      dispatch({ type: Actions.SET_INCENTIVES, payload: incentives })
    } else {
      dispatch({ type: Actions.SET_ERROR, payload: ERROR_MSG });
    }
  };

  const redeem = async () => {
    const incentive = await redeemIncentive();
    dispatch({ type: Actions.SET_LOADING, payload: true });

    if (incentive) {
      dispatch({ type: Actions.SET_REDEEMED_INCENTIVE, payload: incentive })
    } else {
      dispatch({ type: Actions.SET_ERROR, payload: ERROR_MSG });
    }
  };

  return { ...state, redeem, list, create }
}

export default useIncentive;