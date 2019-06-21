var app = getApp();

Page({
    data: {
        nav: [ {
            title: "全部",
            status: 0
        }, {
            title: "待支付",
            status: 1
        }, {
            title: "待配送",
            status: 2
        }, {
            title: "配送中",
            status: 3
        }, {
            title: "待自提",
            status: 4
        }, {
            title: "已完成",
            status: 5
        }, {
            title: "已取消",
            status: 6
        } ],
        curHdIndex: 0,
        show: !1,
        page: 1,
        limit: 5,
        olist: []
    },
    onLoad: function(t) {
        this.setData({
            curHdIndex: t.id ? t.id : 0
        });
        var a = wx.getStorageSync("userInfo");
        a ? this.setData({
            uInfo: a
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/public/pages/myorder/myorder?id=0");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a);
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index");
            }
        });
    },
    onShow: function() {
        this.setData({
            page: 1
        }), this.loadData();
    },
    loadData: function() {
        var s = this, o = s.data.olist, i = s.data.limit, n = s.data.page;
        app.ajax({
            url: "Corder|getOrders",
            data: {
                user_id: s.data.uInfo.id,
                page: n,
                limit: i,
                state: s.data.curHdIndex
            },
            success: function(t) {
                var a = t.data.length == i;
                if (1 == n) o = t.data; else for (var e in t.data) o.push(t.data[e]);
                n += 1, s.setData({
                    olist: o,
                    show: !0,
                    hasMore: a,
                    page: n,
                    imgroot: t.other.img_root
                });
            }
        });
    },
    swichNav: function(t) {
        var a = t.currentTarget.dataset.status;
        this.setData({
            curHdIndex: a,
            page: 1
        }), this.loadData();
    },
    onReachBottom: function() {
        this.data.hasMore ? this.loadData() : wx.showToast({
            title: "没有更多订单啦~",
            icon: "none"
        });
    },
    cancelOrder: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.olist;
        wx.showModal({
            title: "提示",
            content: "确定取消该订单吗",
            success: function(t) {
                t.confirm && app.ajax({
                    url: "Corder|cancelOrder",
                    data: {
                        order_id: s[e].id
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "取消成功"
                        }), s.splice(e, 1), a.setData({
                            olist: s
                        });
                    }
                });
            }
        });
    },
    deleteOrder: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.olist;
        wx.showModal({
            title: "提示",
            content: "订单删除后不再显示",
            success: function(t) {
                t.confirm && app.ajax({
                    url: "Corder|deleteOrder",
                    data: {
                        order_id: s[e].id
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "删除成功"
                        }), s.splice(e, 1), a.setData({
                            olist: s
                        });
                    }
                });
            }
        });
    },
    payNow: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        app.ajax({
            url: "Corder|payOrder",
            data: {
                order_id: a.data.olist[e].id
            },
            success: function(t) {
                t.other.paydata && wx.requestPayment({
                    timeStamp: t.other.paydata.timeStamp,
                    nonceStr: t.other.paydata.nonceStr,
                    package: t.other.paydata.package,
                    signType: t.other.paydata.signType,
                    paySign: t.other.paydata.paySign,
                    success: function(t) {
                        app.reTo("/sqtg_sun/pages/zkx/pages/ordersuccess/ordersuccess");
                    }
                });
            },
            complete: function() {
                a.setData({
                    isRequest: 0
                });
            }
        });
    }
});