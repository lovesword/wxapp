var app = getApp(), setIndex = 0, s = require("../../../../zhy/template/wxParse/wxParse.js"), foot = require("../../../../zhy/component/comFooter/dealfoot.js");

Page({
    data: {
        curHdIndex: 0,
        page: 1,
        limit: 5,
        olist: [],
        flag: !1,
        num: 1,
        showModalStatus: !1,
        addCarStatus: !1,
        buyNow: !1,
        unitPrice: 0,
        addCount: 1,
        protect: !0
    },
    onHide: function() {
        clearInterval(setIndex);
    },
    onShow: function() {
        var a = this, t = wx.getStorageSync("linkaddress");
        if (t) {
            a.setData({
                linkaddress: t
            });
            var e = wx.getStorageSync("userInfo");
            e ? (a.setData({
                user_id: e.id,
                page: 1
            }), this.loadData()) : wx.showModal({
                title: "提示",
                content: "您未登陆，请先登陆！",
                success: function(t) {
                    if (t.confirm) {
                        var a = encodeURIComponent("/sqtg_sun/pages/home/index/index");
                        app.reTo("/sqtg_sun/pages/home/login/login?id=" + a);
                    } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index");
                }
            }), setIndex = setInterval(function() {
                var t = new Date().getTime();
                a.setData({
                    curr: t
                });
            }, 1e3);
        } else app.reTo("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders");
    },
    onLoad: function(t) {
        t.share_user_id && wx.setStorageSync("share_user_id", t.share_user_id);
    },
    loadData: function() {
        var e = this;
        app.ajax({
            url: "Csystem|getSetting",
            success: function(t) {
                e.setData({
                    setting: t.data,
                    imgRoot: t.other.img_root
                }), wx.setStorageSync("appConfig", t.data), wx.setNavigationBarTitle({
                    title: t.data.index_title
                }), wx.setNavigationBarColor({
                    frontColor: t.data.fontcolor,
                    backgroundColor: t.data.top_color
                });
            }
        });
        var o = 0;
        wx.getStorageSync("userInfo");
        wx.setStorageSync("footNav", null), app.ajax({
            url: "Index|getIndexData",
            success: function(t) {
                e.setData({
                    index: t.data,
                    imgRoot: t.other.img_root
                });
                var a = foot.dealFootNav(t.data.swipers, t.other.img_root, 1);
                e.setData({
                    banner: a
                }), 1 == ++o && e.setData({
                    show: !0
                }), e.getCoupons();
            }
        }), app.api.getCartCount({
            user_id: e.data.user_id,
            leader_id: e.data.linkaddress.id
        }).then(function(t) {
            e.setData({
                cartCount: t
            });
        }), e.getgoodses();
    },
    getCoupons: function() {
        var e = this;
        app.ajax({
            url: "Ccoupon|getAvailableCoupons",
            data: {
                user_id: e.data.user_id || 0,
                page: 1,
                limit: 6
            },
            success: function(t) {
                var a = app.globalData.couponFlag;
                e.setData({
                    flag: t.data.length && a,
                    coupons: t.data
                });
            }
        });
    },
    _onNavTab1: function(t) {
        var a = getCurrentPages(), e = "/" + a[a.length - 1].route, o = t.currentTarget.dataset.index, s = this.data.banner[o].link, n = this.data.banner[o].typeid;
        s != e && "" != s && app.navTo(s + "?id=" + n);
    },
    _onNavTab2: function(t) {
        var a = getCurrentPages(), e = "/" + a[a.length - 1].route, o = t.currentTarget.dataset.index, s = this.data.nav[o].link, n = this.data.nav[o].typeid;
        s != e && "" != s && app.navTo(s + "?id=" + n);
    },
    _onNavTab3: function(t) {
        var a = getCurrentPages(), e = "/" + a[a.length - 1].route, o = t.currentTarget.dataset.index, s = this.data.centerAd[o].link, n = this.data.centerAd[o].typeid;
        s != e && "" != s && app.navTo(s + "?id=" + n);
    },
    receivecoupon: function(t) {
        for (var a = this, e = wx.getStorageSync("userInfo"), o = a.data.coupons, s = [], n = 0; n < o.length; n++) s.push(o[n].id);
        t.currentTarget.dataset.index;
        e ? app.ajax({
            url: "Ccoupon|receiveCoupon",
            data: {
                user_id: a.data.user_id,
                coupon_ids: s.join(",")
            },
            success: function(t) {
                0 == t.code && (wx.showToast({
                    title: t.data,
                    icon: "none"
                }), a.close());
            },
            fail: function(t) {
                app.tips(t.data.msg), setTimeout(function() {
                    a.setData({
                        flag: !1
                    });
                }, 1e3);
            }
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/home/index/index");
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a);
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index");
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = wx.getStorageSync("userInfo").id;
        return {
            title: this.data.setting.index_title,
            path: "/sqtg_sun/pages/home/index/index?share_user_id=" + a
        };
    },
    swichNav: function(t) {
        var a = t.currentTarget.dataset.index;
        t.currentTarget.dataset.catid;
        this.setData({
            curHdIndex: a,
            page: 1,
            catid: t.currentTarget.dataset.catid
        }), this.getgoodses();
    },
    getgoodses: function() {
        var o = this, s = o.data.olist, n = o.data.limit, r = o.data.page;
        app.ajax({
            url: "Cgoods|getGoodses",
            data: {
                cat_id: o.data.catid,
                page: r,
                limit: n,
                leader_id: o.data.linkaddress.id
            },
            success: function(t) {
                var a = t.data.length == n;
                if (1 == r) s = t.data; else for (var e in t.data) s.push(t.data[e]);
                r += 1, o.setData({
                    olist: s,
                    show: !0,
                    hasMore: a,
                    page: r,
                    imgroot: t.other.img_root
                }), o.totalPrice();
            }
        });
    },
    onReachBottom: function() {
        this.data.hasMore ? this.getgoodses() : wx.showToast({
            title: "没有更多商品啦~",
            icon: "none"
        });
    },
    close: function() {
        this.setData({
            flag: !1
        }), app.globalData.couponFlag = !1;
    },
    totalPrice: function() {
        var t = this.data.unitPrice, a = this.data.num, e = (parseFloat(t) * parseInt(a)).toFixed(2);
        this.setData({
            totalPrice: e
        });
    },
    spTap: function(t) {
        var a = this, e = a.data.protect, o = !1, s = t.currentTarget.dataset.index, n = t.currentTarget.dataset.idx, r = (t.currentTarget.dataset.id, 
        a.data.olist[a.data.currIndex]);
        r.attrgroups[s].status = !0;
        for (var i = 0; i < r.attrgroups.length; i++) {
            if (1 != r.attrgroups[i].status) {
                o = !1;
                break;
            }
            o = !0;
        }
        r.attrgroups[s].attrs.forEach(function(t, a) {
            t.status = !1;
        }), r.attrgroups[s].attrs[n].status = !0;
        for (var d = ",", u = "", c = 0; c < r.attrgroups.length; c++) for (var g = 0; g < r.attrgroups[c].attrs.length; g++) r.attrgroups[c].attrs[g].status && (d += r.attrgroups[c].attrs[g].id + ",", 
        u += r.attrgroups[c].attrs[g].name + " ");
        e && o && (a.setData({
            protect: !1
        }), app.ajax({
            url: "Cgoods|getGoodsAttrs",
            data: {
                goods_id: r.id,
                attr_ids: d
            },
            success: function(t) {
                a.setData({
                    protect: !0
                }), 0 == t.code && (a.setData({
                    unitPrice: t.data[0].price,
                    stock: t.data[0].stock,
                    idGroup: d,
                    choiceindex: s,
                    choiceidx: n,
                    choiceattr: t.data[0]
                }), a.totalPrice());
            },
            fail: function(t) {
                a.setData({
                    protect: !0
                }), app.tips(t.data.msg);
            }
        })), a.setData({
            olist: a.data.olist,
            chooseSpec: u,
            isChecked: o
        });
    },
    addNum: function(t) {
        var a = t.currentTarget.dataset.num, e = this.data.stock, o = this.data.cartCount || 1;
        e <= a ? wx.showToast({
            title: "商品库存不足",
            icon: "none"
        }) : (this.setData({
            num: ++a,
            cartCount: o + 1
        }), this.totalPrice());
    },
    reduceNum: function(t) {
        var a = t.currentTarget.dataset.num, e = this.data.cartCount;
        1 < a ? (this.setData({
            num: --a,
            cartCount: e - 1
        }), this.totalPrice()) : wx.showToast({
            title: "商品不得少于1件",
            icon: "none"
        });
    },
    formSubmit: function(t) {
        this.data.isChecked ? this.data.protect && this.addCarts() : wx.showToast({
            title: "请选择规格",
            icon: "none"
        });
    },
    addCarts: function() {
        var a = this, t = a.data.olist[a.data.currIndex], e = a.data.idGroup, o = a.data.chooseSpec, s = wx.getStorageSync("userInfo"), n = a.data.cartCount;
        app.ajax({
            url: "Ccart|joinCart",
            data: {
                user_id: s.id,
                leader_id: a.data.linkaddress.id,
                goods_id: t.id,
                store_id: t.store_id,
                num: a.data.num,
                attr_ids: t.use_attr ? e : "",
                attr_names: t.use_attr ? o : ""
            },
            success: function(t) {
                wx.showToast({
                    title: "加入购物车成功！",
                    icon: "none"
                }), a.setData({
                    showModalStatus: !1,
                    num: 1,
                    addCount: ++a.data.addCount,
                    cartCount: n + 1
                });
            }
        });
    },
    addCar: function(t) {
        t.currentTarget.dataset.statu;
        var a = t.currentTarget.dataset.index;
        this.setData({
            currIndex: a
        });
        var e = this.data.olist[a];
        e.use_attr ? this.setData({
            showModalStatus: !0,
            unitPrice: e.price || 0
        }) : this.addCarts();
    },
    oclose: function(t) {
        if ("close" != t.currentTarget.dataset.statu) return !1;
        this.setData({
            buyNow: !1,
            showModalStatus: !1
        });
    },
    onPhoneTab: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.setting.jszc_tel
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    submitform: function(t) {
        var a = wx.getStorageSync("userInfo");
        app.ajax({
            url: "Index|addFormid",
            data: {
                user_id: a.id,
                form_id: t.detail.formId
            },
            success: function(t) {}
        });
    },
    onCouponsInfoTab: function(t) {
        var a = this, e = wx.getStorageSync("userInfo"), o = t.currentTarget.dataset.id;
        t.currentTarget.dataset.index, a.data.coupons;
        e ? app.ajax({
            url: "Ccoupon|receiveCoupon",
            data: {
                user_id: e.id,
                coupon_ids: o
            },
            success: function(t) {
                0 == t.code ? wx.showToast({
                    title: "领取成功",
                    icon: "none"
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none"
                }), a.getCoupons();
            }
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/cysc_sun/pages/home/index/index");
                    app.reTo("/cysc_sun/pages/home/login/login?id=" + a);
                } else t.cancel && app.lunchTo("/cysc_sun/pages/home/index/index");
            }
        });
    }
});