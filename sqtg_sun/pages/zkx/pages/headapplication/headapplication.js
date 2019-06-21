/*   time:2018-12-22 16:34:45*/
var WxParse = require("../../../../../zhy/template/wxParse/wxParse.js"),
    app = getApp();
Page({
    data: {
        hasread: !0,
        myleader: {
            check_state: 0
        },
        protect: !0
    },
    onLoad: function(e) {
        var a = this;
        1 == getCurrentPages().length && a.setData({
            showFoot: !0
        });
        var t = wx.getStorageSync("userInfo");
        t && 0 < t.id ? a.setData({
            uInfo: t
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/headapplication/headapplication?id=0");
                    app.navTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        });
        var d = wx.getStorageSync("linkaddress");
        d && app.api.getCartCount({
            user_id: t.id,
            leader_id: d.id
        }).then(function(e) {
            a.setData({
                cartCount: e
            })
        }), a.getmyleader()
    },
    getmyleader: function() {
        var s = this;
        app.ajax({
            url: "Cleader|getMyLeader",
            data: {
                user_id: s.data.uInfo.id
            },
            success: function(e) {
                if (e.data && 2 == e.data.check_state) app.reTo("../headcenter/headcenter");
                else {
                    var a = e.other.apply_detail;
                    WxParse.wxParse("detail", "html", a, s, 0);
                    var t = e.data || {}, d = t.latitude ? t.latitude + "," + t.longitude : "";
                    t.leadercommunity = t.community, e.data = e.data || {}, s.setData({
                        show: !0,
                        myleader: t,
                        address: t.address || "请填写详细地址",
                        coordinates: d
                    }), wx.setNavigationBarTitle({
                        title: "团长申请"
                    })
                }
            }
        })
    },
    formBindsubmit: function(e) {
        var a = this,
            t = a.data.protect,
            d = a.data.uInfo.id,
            s = e.detail.value.id,
            i = e.detail.value.leadername,
            n = e.detail.value.leadertel,
            o = e.detail.value.leadercommunity,
            r = e.detail.value.leaderaddress,
            l = a.data.latitude || e.detail.value.latitude,
            u = a.data.longitude || e.detail.value.longitude;
        i && n && o && r && l && u ? 1 != this.data.hasread ? 1 == t && (a.setData({
            protect: !1
        }), app.ajax({
            url: "Cleader|applyLeader",
            data: {
                id: s,
                name: i,
                tel: n,
                community: o,
                address: r,
                longitude: u,
                latitude: l,
                user_id: d
            },
            success: function(e) {
                a.setData({
                    protect: !0,
                    myleader: e.data.data
                })
            },
            fail: function(e) {
                a.setData({
                    protect: !0
                })
            }
        })) : app.tips("请先阅读申请规则") : wx.showToast({
            title: "有参数未填写",
            icon: "none",
            duration: 2e3
        })
    },
    chooseaddress: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
                var a = e.latitude + "," + e.longitude;
                t.setData({
                    address: e.address,
                    coordinates: a,
                    latitude: e.latitude,
                    longitude: e.longitude
                })
            },
            fail: function(e) {
                wx.getSetting({
                    success: function(e) {
                        e.authSetting["scope.userLocation"] || (console.log("进入信息授权开关页面"), wx.openSetting({
                            success: function(e) {
                                console.log("openSetting success", e.authSetting)
                            }
                        }))
                    }
                })
            }
        })
    },
    tapreadFirst: function() {
        this.setData({
            hasread: !0,
            hasreadWind: !0
        })
    },
    tapRulebtn: function() {
        this.setData({
            hasread: !1,
            hasreadWind: !1
        })
    }
});