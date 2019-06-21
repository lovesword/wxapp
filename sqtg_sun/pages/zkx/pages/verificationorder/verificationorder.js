/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        show: !1,
        padding: !1,
        editFlag: !1,
        onum: 0
    },
    getPadding: function(a) {
        this.setData({
            padding: a.detail
        })
    },
    onLoad: function(a) {
        var t = a.id,
            e = a.leader_id;
        this.setData({
            code: t,
            leader_id: e
        }), this.loadDate()
    },
    onShow: function(a) {
        this.setData({
            check: {
                plat: !1,
                checkAll: !1
            }
        }), this.loadDate()
    },
    loadDate: function() {
        var t = this;
        app.ajax({
            url: "Cleader|getUserGoodses",
            data: {
                code: t.data.code,
                leader_id: t.data.leader_id
            },
            success: function(a) {
                t.setData({
                    cart: a.data,
                    imgroot: a.other.img_root,
                    show: !0
                })
            }
        })
    },
    getSinglePlat: function(a) {
        var t = this,
            e = t.data.check,
            c = t.data.cart,
            d = a.currentTarget.dataset.index,
            s = 0;
        e.plat = !1, e.checkAll = !1, c[d].status = !c[d].status, c.forEach(function(a, t) {
            a.status && (s += a.num)
        }), t.setData({
            onum: s,
            check: e,
            cart: c
        })
    },
    getAllGoods: function(a) {
        var t = this,
            e = t.data.check,
            c = t.data.cart,
            d = 0;
        e.checkAll = !e.checkAll, e.plat = e.checkAll, c.forEach(function(a, t) {
            a.status = e.checkAll, a.status && (d += a.num)
        }), t.setData({
            onum: d,
            check: e,
            cart: c
        })
    },
    toOrder: function() {
        var a = this.data.cart,
            e = [];
        a.forEach(function(a, t) {
            a.status && e.push(a.id)
        }), app.ajax({
            url: "Cleader|confirmUserGoodses",
            data: {
                ids: e.join(","),
                leader_id: this.data.leader_id
            },
            success: function(a) {
                setTimeout(function() {
                    app.tips("确认提货成功")
                }, 1e3), wx.navigateBack({
                    delta: 1
                })
            }
        })
    }
});