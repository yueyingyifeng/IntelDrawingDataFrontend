import { reactive } from 'vue'

export const store = reactive({
    _TableData: [[]],
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
    storeTableData: function (tableData) {
        this._TableData = tableData
    },

    getUserData: function () {
        return this._UserData
    },
    getTableData: function () {
        return this._TableData
    },
    cookies:{
        UserData:"UserData"
    }
})