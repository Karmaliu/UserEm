import { query, deleteUser, addUser, updateUser } from '../services/user';

export default {
	namespace: 'user',

	state: {
		list: [],
		loading:false
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, query }) => {
				if (pathname === '/user') {
					dispatch({
						type: 'queryUser'
					});
				}
			});
		}
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			// eslint-disable-line
			yield put({ type: 'save' });
		},
		*queryUser({ payload:name }, { call, put }) {
			yield put({
				 type:'changeLoading',
				 payload: {loading:true}
			})
			const { data } = yield call(query,name);
			if (data) {
				yield put({
					type: 'save',
					payload: data.results
				});
				yield put({
					type:'changeLoading',
					payload: {loading:false}
			   })
			}
		},
		*deleteUser({ payload: userId }, { call, put }) {
			const { data } = yield call(deleteUser, userId);
			if (data && data.results.status === 0) {
				yield put({
					type: 'queryUser'
				});
			}
		},
		*addUser({ payload: values }, { call, put }) {
			const { data } = yield call(addUser, values);
			if (data && data.results.status === 0) {
				yield put({
					type: 'queryUser'
				})
			}
		},
		*updateUser({ payload: values }, { call, put }) {
			const { data } = yield call(updateUser, values);
			if(data && data.results.status === 0){
				yield put({
					type:'queryUser'
				})
			}
		}
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				list: action.payload
			};
		},
		changeLoading(state,action){
			return {
				...state,
				loading:action.payload.loading
			}
		}
	}
};
