/*   time:2018-12-22 16:34:44*/
var WxParse = require("../../../../../../zhy/template/wxParse/wxParse.js"),
    app = getApp();
Page({
    data: {
        hasread: !0,
        mystore: {
            check_state: 0
        },
        protect: !0
    },
    onLoad: function(t) {
        var e = this;
        1 == getCurrentPages().length && e.setData({
            showFoot: !0
        });
        var a = wx.getStorageSync("userInfo");
        a ? e.setData({
            uInfo: a
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var e = encodeURIComponent("/sqtg_sun/pages/zkx/pages/merchants/merchantenter/merchantenter");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + e)
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        });
        var s = wx.getStorageSync("linkaddress");
        s ? (e.setData({
            linkaddress: s
        }), app.api.getCartCount({
            user_id: a.id,
            leader_id: s.id
        }).then(function(t) {
            e.setData({
                cartCount: t
            })
        }), e.getmystore()) : app.reTo("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders")
    },
    getmystore: function() {
        var i = this;
        app.ajax({
            url: "Cstore|getMyStore",
            data: {
                user_id: i.data.uInfo.id
            },
            success: function(t) {
                if (t.data && 2 == t.data.check_state) app.reTo("../merchantcenter/merchantcenter");
                else {
                    var e = t.other.apply_detail;
                    WxParse.wxParse("detail", "html", e, i, 0);
                    var a = {
                        show: !0
                    };
                    if (t.data) {
                        var s = t.data,
                            n = s.latitude + "," + s.longitude;
                        t.data = t.data || {}, a.mystore = s, a.address = s.address, a.coordinates = n
                    }
                    i.setData(a), wx.setNavigationBarTitle({
                        title: "商家入驻"
                    })
                }
            }
        })
    },
    formBindsubmit: function(t) {
        var e = this,
            a = e.data.protect,
            s = t.detail.value.id,
            n = e.data.uInfo.id,
            i = t.detail.value.storename,
            o = t.detail.value.storetel,
            d = t.detail.value.distance,
            r = e.data.address,
            c = e.data.latitude || t.detail.value.latitude,
            u = e.data.longitude || t.detail.value.longitude;
        i && o && r && d && c && u ? 1 != this.data.hasread ? 1 == a && (e.setData({
            protect: !1
        }), app.ajax({
            url: "Cstore|applyStore",
            data: {
                id: s,
                name: i,
                tel: o,
                address: r,
                longitude: u,
                latitude: c,
                user_id: n,
                distance: d
            },
            success: function(t) {
                e.setData({
                    protect: !0,
                    mystore: t.data
                })
            },
            fail: function(t) {
                e.setData({
                    protect: !0
                })
            }
        })) : app.tips("请先阅读申请规则") : wx.showToast({
            title: "有参数未填写",
            icon: "none",
            duration: 2e3
        })
    },
    chooseaddress: function(t) {
        var a = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                t.latitude, t.longitude, t.speed, t.accuracy;
                var e = t.latitude + "," + t.longitude;
                a.setData({
                    address: t.address,
                    coordinates: e,
                    latitude: t.latitude,
                    longitude: t.longitude
                })
            },
            fail: function(t) {
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userLocation"] || (console.log("进入信息授权开关页面"), wx.openSetting({
                            success: function(t) {
                                console.log("openSetting success", t.authSetting)
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