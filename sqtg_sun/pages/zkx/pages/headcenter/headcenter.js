/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        reload: !1
    },
    onLoad: function(e) {
        var a = this;
        1 == getCurrentPages().length && a.setData({
            showFoot: !0
        });
        var t = wx.getStorageSync("userInfo");
        t ? a.setData({
            user_id: t.id
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/headcenter/headcenter");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        });
        var n = wx.getStorageSync("linkaddress");
        n ? (a.setData({
            linkaddress: n
        }), a.getmyleader()) : app.navTo("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders")
    },
    getmyleader: function() {
        var a = this,
            e = wx.getStorageSync("userInfo");
        app.ajax({
            url: "Cleader|getMyLeader",
            data: {
                user_id: e.id
            },
            success: function(e) {
                e.data && 2 == e.data.check_state ? (a.setData({
                    show: !0,
                    myleader: e.data
                }), wx.setNavigationBarTitle({
                    title: "团长后台"
                })) : app.reTo("../headapplication/headapplication")
            }
        }), app.api.getCartCount({
            user_id: a.data.user_id,
            leader_id: a.data.linkaddress.id
        }).then(function(e) {
            a.setData({
                cartCount: e
            })
        })
    },
    onLoadData: function() {
        var a = this,
            t = wx.getStorageSync("userInfo");
        t ? (app.ajax({
            url: "Index|getpluginkey",
            success: function(e) {
                a.setData({
                    control: e.data
                })
            }
        }), app.ajax({
            url: "Cuser|myInfo",
            data: {
                user_id: t.id
            },
            success: function(e) {
                a.setData({
                    info: e.data,
                    imgRoot: e.other.img_root,
                    show: !0,
                    user_id: t.id
                })
            }
        })) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/home/my/my?id=123");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        })
    },
    myScan: function() {
        var n = this;
        wx.scanCode({
            success: function(e) {
                var a = e.result;
                if (/code-/.test(a)) {
                    var t = a.replace("code-", "");
                    app.navTo("/sqtg_sun/pages/zkx/pages/verificationorder/verificationorder?id=" + t + "&leader_id=" + n.data.myleader.id)
                }
            }
        })
    }
});