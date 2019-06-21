/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        show: !1,
        showModalStatus: !1,
        payType: [{
            name: "微信支付",
            pic: "../../resource/images/wx.png"
        }, {
            name: "余额支付",
            pic: "../../resource/images/local.png"
        }],
        curPay: 1,
        showCoupon: !1,
        isRequest: 0,
        flag: !1,
        coupon: {
            money: 0,
            id: 0
        },
        phoneGrant: !1,
        protect: !0
    },
    onLoad: function() {},
    onShow: function() {
        var a = this,
            t = wx.getStorageSync("userInfo"),
            e = wx.getStorageSync("linkaddress");
        if (e && a.setData({
            linkaddress: e
        }), t) {
            var o = t.id;
            a.setData({
                user_id: o
            }), a.loadDate()
        } else wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(a) {
                if (a.confirm) {
                    var t = encodeURIComponent("/sqtg_sun/pages/zkx/pages/classifyorder/classifyorder");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + t)
                } else a.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        });
        t.tel || a.setData({
            phoneGrant: !0
        })
    },
    loadDate: function() {
        for (var a = getCurrentPages(), t = a[a.length - 2], e = t.data.goodses, o = 0, s = 0; s < e.length; s++) e[s].amount = (e[s].price * e[s].num).toFixed(2), o += e[s].price * e[s].num;
        this.setData({
            show: !0,
            goodses: e,
            imgroot: t.data.imgroot,
            allprice: o.toFixed(2)
        }), this.getTotalPrice()
    },
    toSgjoin: function(a) {
        this.setData({
            showModalStatus: !this.data.showModalStatus
        })
    },
    changePayType: function(a) {
        this.setData({
            curPay: a.currentTarget.dataset.index
        })
    },
    getTotalPrice: function() {
        var a = this,
            t = a.data.allprice;
        a.setData({
            actualPrice: (t - a.data.coupon.money).toFixed(2)
        })
    },
    subOrder: function(a) {
        var e = this,
            o = e.data.goodses,
            t = e.data.protect;
        console.log(t), t && (e.setData({
            protect: !1
        }), app.ajax({
            url: "Index|addFormid",
            data: {
                user_id: e.data.user_id,
                form_id: a.detail.formId
            },
            success: function(a) {
                console.log(a)
            }
        }), e.data.order_id ? app.ajax({
            url: "Corder|payOrder",
            data: {
                order_id: e.data.order_id
            },
            success: function(a) {
                a.other.paydata && wx.requestPayment({
                    timeStamp: a.other.paydata.timeStamp,
                    nonceStr: a.other.paydata.nonceStr,
                    package: a.other.paydata.package,
                    signType: a.other.paydata.signType,
                    paySign: a.other.paydata.paySign,
                    success: function(a) {
                        e.setData({
                            protect: !0
                        }), app.reTo("/sqtg_sun/pages/zkx/pages/ordersuccess/ordersuccess")
                    },
                    fail: function() {
                        e.setData({
                            protect: !0,
                            isRequest: 0
                        })
                    }
                })
            },
            fail: function(a) {
                e.setData({
                    protect: !0
                }), app.tips(a.data.msg)
            }
        }) : app.ajax({
            url: "Corder|addOrder",
            data: {
                user_id: e.data.user_id,
                leader_id: e.data.linkaddress.id,
                amount: e.data.allprice,
                coupon_money: e.data.coupon.money,
                usercoupon_id: e.data.coupon.id,
                pay_amount: e.data.actualPrice,
                goodses: JSON.stringify(o)
            },
            success: function(a) {
                e.setData({
                    order_id: a.data
                });
                var t = [];
                o.forEach(function(a) {
                    a.id && t.push(a.id)
                }), t.length && app.ajax({
                    url: "Ccart|deleteCarts",
                    data: {
                        cart_ids: 0 < t.length ? t.join(",") : t
                    },
                    success: function(a) {
                        console.log(a)
                    }
                }), a.other.paydata && wx.requestPayment({
                    timeStamp: a.other.paydata.timeStamp,
                    nonceStr: a.other.paydata.nonceStr,
                    package: a.other.paydata.package,
                    signType: a.other.paydata.signType,
                    paySign: a.other.paydata.paySign,
                    success: function(a) {
                        e.setData({
                            protect: !0
                        }), app.reTo("/sqtg_sun/pages/zkx/pages/ordersuccess/ordersuccess")
                    },
                    fail: function() {
                        e.setData({
                            protect: !0,
                            isRequest: 0,
                            buttonName: "继续支付"
                        })
                    }
                })
            },
            fail: function(a) {
                e.setData({
                    protect: !0
                }), app.tips(a.data.msg)
            }
        }))
    },
    coupons: function() {
        var t = this;
        if (t.data.order_id) return wx.showModal({
            title: "提示",
            content: "点击提交之后无法再修改订单信息，如需修改，请退出当前页面，重新下单",
            success: function(a) {
                a.confirm && wx.navigateBack({})
            }
        }), !1;
        var e = t.data.allprice;
        app.ajax({
            url: "Ccoupon|getMyCoupons",
            data: {
                user_id: t.data.user_id,
                page: 1,
                limit: 100,
                state: 1
            },
            success: function(a) {
                a.data.forEach(function(a, t) {
                    0 <= e - a.use_money && (a.can_use = !0)
                }), a.data.sort(function(a, t) {
                    var e = 1e3 * (a.money - 0 + (a.can_use ? 1e3 : 0)) + (1e3 - a.use_money);
                    return 1e3 * (t.money - 0 + (t.can_use ? 1e3 : 0)) + (1e3 - t.use_money) - e
                }), t.setData({
                    coupons: a.data,
                    flag: !0
                })
            }
        })
    },
    close: function() {
        this.setData({
            flag: !1
        })
    },
    getCoupons: function(a) {
        var t = a.currentTarget.dataset.index,
            e = this.data.coupons[t];
        this.setData({
            coupon: e,
            flag: !1
        }), this.getTotalPrice()
    },
    getPhoneNumber: function(a) {
        var e = this,
            o = wx.getStorageSync("open_id"),
            t = wx.getStorageSync("session_key");
        app.ajax({
            url: "Cwx|decrypt",
            data: {
                data: a.detail.encryptedData,
                iv: encodeURIComponent(a.detail.iv),
                key: t
            },
            success: function(a) {
                if (a.data.phoneNumber) {
                    e.setData({
                        phoneGrant: !1
                    });
                    var t = {
                        openid: o,
                        tel: a.data.phoneNumber
                    };
                    app.ajax({
                        url: "Cuser|login",
                        data: t,
                        success: function(a) {
                            a.code ? app.tips(a.msg) : (wx.setStorageSync("userInfo", a.data), e.setData({
                                phoneGrant: !1
                            }))
                        }
                    })
                }
            }
        })
    },
    toSetphonenum: function() {
        this.setData({
            phoneGrant: !1
        })
    },
    onPhoneTab: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.linkaddress.tel
        })
    }
});