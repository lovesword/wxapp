var app = getApp(), wxbarcode = require("../../../../zhy/resource/js/index.js");

Page({
    data: {
        phoneGrant: !1
    },
    onLoad: function(e) {},
    onShow: function() {
        var t = this, a = wx.getStorageSync("userInfo");
        a ? app.ajax({
            url: "Cuser|myInfo",
            data: {
                user_id: a.id
            },
            success: function(e) {
                t.setData({
                    show: !0,
                    info: e.data,
                    imgRoot: e.other.img_root,
                    user_id: a.id
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(e) {
                if (e.confirm) {
                    var t = encodeURIComponent("/sqtg_sun/pages/home/my/my?id=123");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + t);
                } else e.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index");
            }
        });
        var e = wx.getStorageSync("linkaddress");
        e && this.setData({
            linkaddress: e
        }), app.api.getCartCount({
            user_id: a.id,
            leader_id: e.id
        }).then(function(e) {
            t.setData({
                cartCount: e
            });
        }), a.tel || t.setData({
            phoneGrant: !0
        });
    },
    getPhoneNumber: function(e) {
        var a = this, n = wx.getStorageSync("open_id"), t = wx.getStorageSync("session_key");
        app.ajax({
            url: "Cwx|decrypt",
            data: {
                data: e.detail.encryptedData,
                iv: encodeURIComponent(e.detail.iv),
                key: t
            },
            success: function(e) {
                if (e.data.phoneNumber) {
                    a.setData({
                        phoneGrant: !1
                    });
                    var t = {
                        openid: n,
                        tel: e.data.phoneNumber
                    };
                    app.ajax({
                        url: "Cuser|login",
                        data: t,
                        success: function(e) {
                            e.code ? app.tips(e.msg) : (wx.setStorageSync("userInfo", e.data), a.setData({
                                phoneGrant: !1
                            }), app.lunchTo("/sqtg_sun/pages/home/my/my"));
                        }
                    });
                }
            }
        });
    },
    loadCode: function(e) {
        app.ajax({
            url: "Cuser|getUserCode",
            data: {
                user_id: e
            },
            success: function(e) {
                wxbarcode.qrcode("qrcode", "code-" + e.data, 300, 300);
            }
        });
    },
    qrcode: function() {
        var e = wx.getStorageSync("userInfo");
        this.setData({
            qrcode: !0
        }), this.loadCode(e.id);
    },
    close: function() {
        this.setData({
            qrcode: !1
        });
    },
    toSetphonenum: function() {
        this.setData({
            phoneGrant: !1
        });
    },
    distribution: function() {
        this.data.info;
        app.navTo("/sqtg_sun/pages/plugin/distribution/distributioncenter/distributioncenter");
    }
});