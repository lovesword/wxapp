function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

App({
    onLaunch: function() {},
    siteInfo: require("siteinfo.js"),
    util: require("/we7/js/util.js"),
    ajax: require("/zhy/resource/js/request.js"),
    Func: require("/zhy/resource/js/func.js"),
    api: require("/zhy/resource/js/api.js"),
    tabSuccess: function() {
        this.globalData.tab = !1;
    },
    navTo: function(t) {
        var a = t.split("?")[0], e = wx.getStorageSync("footNav"), s = !1;
        if (e) for (var o in e) a == e[o].link && (s = !0);
        this.globalData.tab || (this.globalData.tab = !this.globalData.tab, s ? wx.redirectTo({
            url: t,
            success: this.tabSuccess
        }) : wx.navigateTo({
            url: t,
            success: this.tabSuccess
        }));
    },
    reTo: function(t) {
        this.globalData.tab || (this.globalData.tab = !this.globalData.tab, wx.redirectTo({
            url: t,
            success: this.tabSuccess
        }));
    },
    lunchTo: function(t) {
        this.globalData.tab || (this.globalData.tab = !this.globalData.tab, wx.reLaunch({
            url: t,
            success: this.tabSuccess
        }));
    },
    tips: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 1500
        });
    },
    checkSetting: function() {
        var t = wx.getStorageSync("appConfig");
        t ? wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.top_color
        }) : this.ajax({
            url: "Csystem|getSetting",
            success: function(t) {
                wx.setStorageSync("appConfig", t.data), wx.setNavigationBarColor({
                    frontColor: t.data.fontcolor,
                    backgroundColor: t.data.top_color
                });
            }
        });
    },
    globalData: {
        tab: !1,
        showMaskFlag: !1,
        backUrl: "",
        couponFlag: !0
    }
});

var Page_temp = Page;

Page = function(t) {
    var e = getApp();
    t.data.addressFalse = !0, t.data.list = {
        page: 1,
        length: 10,
        over: !1,
        load: !1,
        none: !1,
        data: []
    }, t.data.padding = !1, t.data.show = !1, t.data.newPage = !1;
    var s = t.onLoad;
    return t.onLoad = function(t) {
        t = e.Func.func.decodeScene(t), e.checkSetting(), s.call(this, t);
        var a = getCurrentPages();
        null == a[a.length - 2] && this.setData({
            newPage: !0
        });
    }, t.getPadding = function(t) {
        this.setData({
            padding: t.detail
        });
    }, t.dealList = function(t, a) {
        var e, s = this;
        1 == a && s.setData({
            list: {
                page: 1,
                length: 10,
                over: !1,
                load: !1,
                none: !1,
                data: []
            }
        });
        var o = s.data.list.data.concat(t);
        t.length < s.data.list.length && (s.setData(_defineProperty({}, "list.over", !0)), 
        0 === o.length && s.setData(_defineProperty({}, "list.none", !0))), s.setData((_defineProperty(e = {}, "list.load", !1), 
        _defineProperty(e, "list.page", ++s.data.list.page), _defineProperty(e, "list.data", o), 
        e));
    }, t.getAddress = function(t) {
        var a = this;
        this.data.addressFalse && wx.chooseAddress({
            success: function(t) {
                a.setData({
                    expressInfo: t
                }), wx.setStorageSync("expressInfo", t), a.checkFee();
            },
            fail: function(t) {
                a.setData({
                    addressFalse: !1
                });
            }
        });
    }, t.openWXSetting = function(t) {
        t.detail.authSetting["scope.address"] && (this.setData({
            addressFalse: !0
        }), this.getAddress());
    }, t.onHomeTab = function(t) {
        e.lunchTo("/sqtg_sun/pages/home/index/index");
    }, Page_temp(t);
};