/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        address: "请选择地址",
        page: 1,
        limit: 10,
        olist: []
    },
    onLoad: function(e) {
        var t = this,
            s = wx.getStorageSync("userInfo");
        s && 0 < s.id ? app.ajax({
            url: "Cuser|myInfo",
            data: {
                user_id: s.id
            },
            success: function(e) {
                t.setData({
                    info: e.data,
                    user_id: s.id
                });
                var a = wx.getStorageSync("choiceaddress");
                a ? (t.setData({
                    choiceaddress: a
                }), t.getNearLeader()) : wx.getLocation({
                    type: "wgs84",
                    success: function(e) {
                        wx.setStorageSync("choiceaddress", e), t.setData({
                            choiceaddress: e
                        }), t.getNearLeader()
                    },
                    fail: function(e) {
                        t.setData({
                            popAllow: !0
                        })
                    }
                })
            }
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        })
    },
    setAddress: function(e) {
        wx.setStorageSync("linkaddress", e.currentTarget.dataset.address), 1 == getCurrentPages().length ? app.lunchTo("/sqtg_sun/pages/home/index/index") : wx.navigateBack({})
    },
    getNearLeader: function() {
        var s = this,
            e = s.data.choiceaddress;
        if (e) {
            var o = s.data.olist,
                n = s.data.limit,
                i = s.data.page;
            app.ajax({
                url: "Cleader|getNearLeaders",
                data: {
                    longitude: e.longitude,
                    latitude: e.latitude,
                    page: s.data.page,
                    limit: s.data.limit,
                    key: s.data.key
                },
                success: function(e) {
                    if (e.data.length < 1) s.setData({
                        unleder: !0
                    });
                    else {
                        var a = e.data.length == n;
                        if (1 == i) o = e.data;
                        else for (var t in e.data) o.push(e.data[t]);
                        i += 1, s.setData({
                            olist: o,
                            show: !0,
                            hasMore: a,
                            page: i,
                            unleder: !1
                        })
                    }
                }
            })
        } else wx.showToast({
            title: "请先选择地址",
            icon: "none"
        })
    },
    chooseaddress: function(e) {
        var a = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                wx.setStorageSync("choiceaddress", e), a.setData({
                    choiceaddress: e,
                    page: 1,
                    key: "",
                    headValue: ""
                }), a.getNearLeader()
            },
            fail: function(e) {
                wx.getSetting({
                    success: function(e) {
                        e.authSetting["scope.userLocation"] || wx.openSetting({
                            success: function(e) {}
                        })
                    }
                })
            }
        })
    },
    handler: function(e) {
        var a = this;
        e.detail.authSetting["scope.userLocation"] ? wx.getLocation({
            type: "wgs84",
            success: function(e) {
                a.setData({
                    choiceaddress: e
                }), a.getNearLeader(), a.setData({
                    popAllow: !1
                })
            }
        }) : app.tips("获取地址失败")
    },
    onReachBottom: function() {
        var e = this;
        console.log(e.data.hasMore), e.data.hasMore ? e.getNearLeader() : wx.showToast({
            title: "没有更多团员啦~",
            icon: "none"
        })
    },
    searchBtn: function(e) {
        var a = this,
            t = (a.data.olist, e.detail.value);
        "" != (t = t.trim()) && (a.setData({
            page: 1,
            olist: [],
            key: t
        }), a.getNearLeader())
    }
});