function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), foot = require("./dealfoot.js");

Component({
    properties: {
        chooseNav: {
            type: Number,
            value: 1,
            observer: function(t, a) {}
        },
        sid: {
            type: Number,
            value: 0,
            observer: function(t, a) {}
        },
        cartCount: {
            type: Number,
            value: 0,
            observer: function(t, a) {}
        },
        currURL: {
            type: String,
            value: "",
            observer: function(t, a) {}
        }
    },
    data: {
        show: !1
    },
    attached: function() {
        this._getData();
    },
    detached: function() {},
    ready: function() {},
    methods: {
        _getData: function() {
            var e = this, a = wx.getStorageSync("appConfig");
            a || app.ajax({
                url: "Csystem|getSetting",
                success: function(t) {
                    a = t.data, wx.setStorageSync("appConfig", t.data);
                }
            }), this.setData({
                bg: a.bottom_color ? a.bottom_color : "#fff",
                color: a.bottom_fontcolor_a ? a.bottom_fontcolor_a : "#333",
                colorh: a.bottom_fontcolor_b ? a.bottom_fontcolor_b : "#f87d6d",
                iconbg: a.bottom_cart_color_b ? a.bottom_cart_color_b : "#e9472c",
                iconcolor: a.bottom_cart_color_a ? a.bottom_cart_color_a : "#fff"
            });
            var t = wx.getStorageSync("footNav"), n = wx.getStorageSync("cartNum");
            t ? (this.setData({
                nav: t,
                cartNum: n
            }), this.checkChoose()) : app.ajax({
                url: "Csystem|getNavicon",
                success: function(t) {
                    var a = foot.dealFootNav(t.data, t.other.img_root);
                    e.setData({
                        nav: a,
                        cartNum: n
                    }), wx.setStorageSync("footNav", a), e.checkChoose();
                }
            });
        },
        checkChoose: function() {
            var s = this, t = wx.getStorageSync("userInfo");
            if (t) app.ajax({
                url: "Cuser|myInfo",
                data: {
                    user_id: t.id
                },
                success: function(t) {
                    var a = t.data, e = getCurrentPages(), n = "/" + e[e.length - 1].route;
                    for (var r in s.data.nav) {
                        var o;
                        if ("/sqtg_sun/pages/zkx/pages/headapplication/headapplication" == s.data.nav[r].link && a.is_leader && s.setData(_defineProperty({}, "nav[" + r + "].link", "/sqtg_sun/pages/zkx/pages/headcenter/headcenter")), 
                        "/sqtg_sun/pages/zkx/pages/merchants/merchantenter/merchantenter" == s.data.nav[r].link && a.has_store && s.setData(_defineProperty({}, "nav[" + r + "].link", "/sqtg_sun/pages/zkx/pages/merchants/merchantcenter/merchantcenter")), 
                        s.data.nav[r].link == s.data.currURL || s.data.nav[r].link == n) s.setData((_defineProperty(o = {}, "nav[" + r + "].choose", !0), 
                        _defineProperty(o, "show", !0), o)), s.triggerEvent("padding", !0);
                    }
                }
            }); else {
                var a = !1, e = !1, n = getCurrentPages(), r = "/" + n[n.length - 1].route;
                for (var o in s.data.nav) {
                    var c;
                    if ("/sqtg_sun/pages/zkx/pages/headapplication/headapplication" == s.data.nav[o].link && a && s.setData(_defineProperty({}, "nav[" + o + "].link", "/sqtg_sun/pages/zkx/pages/headcenter/headcenter")), 
                    "/sqtg_sun/pages/zkx/pages/merchants/merchantenter/merchantenter" == s.data.nav[o].link && e && s.setData(_defineProperty({}, "nav[" + o + "].link", "/sqtg_sun/pages/zkx/pages/merchants/merchantcenter/merchantcenter")), 
                    s.data.nav[o].link == s.data.currURL || s.data.nav[o].link == r) s.setData((_defineProperty(c = {}, "nav[" + o + "].choose", !0), 
                    _defineProperty(c, "show", !0), c)), s.triggerEvent("padding", !0);
                }
            }
        },
        _onNavTab: function(t) {
            var a = getCurrentPages(), e = a[a.length - 1], n = "/" + e.route, r = t.currentTarget.dataset.index, o = this.data.nav[r].link, s = this.data.nav[r].typeid;
            o != n && "" != o && (e.setData({
                show: !1
            }), wx.setNavigationBarTitle({
                title: "玩命加载中..."
            }), setTimeout(function() {
                wx.reLaunch({
                    url: o + "?id=" + s
                });
            }, 100));
        },
        onOtherAppTab: function(t) {
            var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.path;
            wx.navigateToMiniProgram({
                appId: a,
                path: e
            });
        },
        _jumpSuccess: function(t) {},
        formSubmit_getformid: function(t) {
            var a = wx.getStorageSync("userInfo");
            app.ajax({
                url: "Index|addFormid",
                data: {
                    user_id: a.id,
                    form_id: t.detail.formId
                }
            });
        }
    }
});