/*   time:2018-12-22 16:34:44*/
var app = getApp();
Page({
    data: {
        showmodalstatus: !1
    },
    onLoad: function(e) {
        var t = this;
        1 == getCurrentPages().length && t.setData({
            showFoot: !0
        });
        var a = wx.getStorageSync("userInfo");
        a ? t.setData({
            show: !0,
            user_id: a.id
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var t = encodeURIComponent("/sqtg_sun/pages/zkx/pages/merchants/merchantcenter/merchantcenter");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + t)
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        });
        var s = wx.getStorageSync("linkaddress");
        s ? (t.setData({
            linkaddress: s
        }), t.getMyStore()) : app.reTo("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders")
    },
    getMyStore: function() {
        var t = this,
            a = wx.getStorageSync("userInfo");
        app.ajax({
            url: "Cstore|getMyStore",
            data: {
                user_id: a.id
            },
            success: function(e) {
                e.data && 2 == e.data.check_state ? (t.setData({
                    show: !0,
                    mystore: e.data,
                    user: a
                }), wx.setNavigationBarTitle({
                    title: "商家中心"
                })) : app.reTo("../merchantenter/merchantenter")
            }
        }), app.api.getCartCount({
            user_id: t.data.user_id,
            leader_id: t.data.linkaddress.id
        }).then(function(e) {
            t.setData({
                cartCount: e
            })
        })
    }
});