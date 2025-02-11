import { reactive } from 'vue'

export const store = reactive({
    _UserData: {
        "token": "none",
        "userInfo": {
            "id": -1,
            "email": "none",
            "name": "none",
            "createTime": 0
        }
    },

    storeUserData: function (userData) {
        this._UserData = userData
    },

    getUserData: function () {
        return this._UserData
    },
    cookies:{
        UserData:"UserData"
    }
})

export const API = (() => {
    const API_ROOT = import.meta.env.VITE_API_ROOT

    return {
        API_ROOT,
        Login:       API_ROOT + "Login",
        Register:    API_ROOT + "Register",
        CreateTable: API_ROOT + "CreateTable",
        GetChartList:API_ROOT + "GetChartList",
        LoadChart:   API_ROOT + "LoadChart",
        DeleteChart: API_ROOT + "DeleteTable",
        UpDateChart: API_ROOT + "UpDateChart",
    };
})();