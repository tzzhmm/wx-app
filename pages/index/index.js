//index.js
//获取应用实例
const app = getApp()
let timer;
let numAi = 0;
Page({
    data: {
        winNum: 0,
        imageAiScr: '',
        imageUserScr: '../images/what.png',
        gameResult: '', 
        srcs: [
            '../images/st.png',
            '../images/jd.png',
            '../images/bu.png',
        ],
        iamgeUserScr: '',
        btnStates: false,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        let oldWinNum = wx.getStorage('winNum');
        if (oldWinNum != null && oldWinNum != '') {
            this.setData({
                winNum: oldWinNum
            })
        }
        this.timerGo();
    },
    // 对比
    changeForChoose(e) {
        if (this.data.btnStates) {
            return
        }
        console.log(e);
        // 点击选择当前的图片
        this.setData({
            imageUserScr: this.data.srcs[e.currentTarget.id]
        })
        // 停止定时器
        clearInterval(timer);
        // 获取数据源
        let user = this.data.imageUserScr;
        let ai = this.data.imageAiScr;
        let numbers = this.data.winNum;
        let defaultStr = '你输了';
        
        // 比较图片地址
        if (user == '../images/st.png' && ai == '../images/jd.png') {
            numbers++;
            defaultStr = '你赢了!'
            wx.setStorageSync('winNum', numbers)

        } else if (user == '../images/jd.png' && ai == '../images/bu.png') {
            numbers++;
            defaultStr = '你赢了!'
            wx.setStorageSync('winNum', numbers)

        } else if (user == '../images/bu.png' && ai == '../images/st.png') {
            numbers++;
            defaultStr = '你赢了!'
            wx.setStorageSync('winNum', numbers)
        }
        if( user == ai ) {
            defaultStr = '平局!'
        }
        this.setData({
            winNum: numbers,
            gameResult: defaultStr,
            btnStates: true,
        })
        
    },
    // timerGo
    timerGo: function () {
        let _this = this;
        timer = setInterval(_this.moveChange,100)
    },
    // 定时器
    moveChange: function() {
        if (numAi >= 3) {
            numAi = 0;
        }
        this.setData({
            imageAiScr: this.data.srcs[numAi]
        })
        numAi++;
    },
    // 再来
    again() {
        if (this.data.btnStates == false) {
            return
        }
        this.timerGo();
        this.setData({
            gameResult: '',
            btnStates: false,
            imageUserScr: '../images/what.png',
        })
    },


    // 获取用户资料
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            imageUserScr: '../images/what.png',
        })
    }
})
