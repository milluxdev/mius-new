const SHOW_SETTINGS = 'SHOW_SETTINGS';
export default {
    namespaced: true,
    state: {
        isSettingsShow: false,
    },
    getters: {
        // todoCount: state => state.todos.length,
    },
    mutations: {
        [SHOW_SETTINGS](state, {
            value
        }) {
            state.isSettingsShow = value;
        },
    },
    actions: {
        showSettings({
            commit
        }, {
            value
        }) {
            commit(SHOW_SETTINGS, {
                value,
            });
        },
    },
};