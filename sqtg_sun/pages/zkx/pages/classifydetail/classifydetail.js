/*   time:2018-12-22 16:34:45*/
var app = getApp(),
    setIndex = 0,
    WxParse = require("../../../../../zhy/template/wxParse/wxParse.js");
Page({
    data: {
        show: !1,
        num: 1,
        showModalStatus: !1,
        omask: !1,
        addCarStatus: !1,
        buyNow: !1,
        hidden: !0,
        specification: {
            spindex: 0
        },
        unitPrice: 0,
        addCount: 1,
        shareMask: !1,
        protect: !0
    },
    onLoad: function(t) {
        var s = this;
        if (t.leader_id) {
            e = wx.getStorageSync("linkaddress");
            var o = t.leader_id,
                a = e ? e.id : 0;
            o != a && wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    var a = t.latitude,
                        e = t.longitude;
                    app.ajax({
                        url: "Cleader|getLeader",
                        data: {
                            longitude: e,
                            latitude: a,
                            leader_id: o
                        },
                        success: function(a) {
                            wx.showModal({
                                title: "提示",
                                content: a.data.name + "团长距离您" + a.data.distance / 1e3 + "Km",
                                success: function(t) {
                                    if (t.confirm) console.log(a.data), wx.setStorageSync("linkaddress", a.data);
                                    else if (t.cancel) {
                                        s.data.goods.leader_has ? console.log("正常取消") : (app.tips("当前团长没有此商品！"), setTimeout(function() {
                                            app.lunchTo("/sqtg_sun/pages/home/index/index")
                                        }, 1e3))
                                    }
                                }
                            })
                        }
                    })
                },
                fail: function(t) {
                    console.log("获取地址失败"), s.setData({
                        popAllow: !0
                    })
                }
            })
        } else {
            var e;
            (e = wx.getStorageSync("linkaddress")) ? s.setData({
                linkaddress: e
            }) : app.navTo("/sqtg_sun/pages/zkx/pages/nearleaders/nearleaders")
        }
        t = app.Func.func.decodeScene(t), this.setData({
            id: t.id
        }), t.share_user_id && wx.setStorageSync("share_user_id", t.share_user_id)
    },
    onHide: function() {
        clearInterval(setIndex), clearTimeout(app.globalData.timer_slideupshoworder)
    },
    onUnload: function() {
        this.onHide()
    },
    onShow: function() {
        var e = this,
            t = wx.getStorageSync("appConfig"),
            a = t.showgw;
        if (1 == a) {
            var s = {
                wg_title: t.wg_title,
                wg_directions: t.wg_directions,
                wg_img: t.wg_img,
                wg_keyword: t.wg_keyword,
                wg_addicon: t.wg_addicon
            };
            e.setData({
                showgw: a,
                wglist: s
            })
        }
        setIndex = setInterval(function() {
            var t = (new Date).getTime();
            e.setData({
                curr: t
            })
        }, 1e3), e.setData({
            isChecked: !1,
            chooseSpec: "",
            showModalStatus: !1
        }), this.loadData(), app.ajax({
            url: "Corder|getOrderSet",
            success: function(t) {
                var a = t.showorderset;
                e.setData({
                    modalHidden: a.modalHidden,
                    fontcolor: a.fontcolor,
                    bgcolor: a.bgcolor,
                    neworder: t.order
                }), e.gotofly(e, 0)
            }
        })
    },
    loadData: function() {
        var e = this,
            t = wx.getStorageSync("linkaddress"),
            a = t ? t.id : 0,
            s = wx.getStorageSync("userInfo") || {};
        s && 0 < s.id ? e.setData({
            uInfo: s
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/classifydetail/classifydetail?id=" + e.data.id);
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        }), app.ajax({
            url: "Cgoods|getGoods",
            data: {
                goods_id: e.data.id,
                leader_id: a
            },
            success: function(t) {
                var a = t.data.details;
                WxParse.wxParse("detail", "html", a, e, 0), t.data.name ? (e.setData({
                    goods: t.data,
                    imgroot: t.other.img_root,
                    show: !0,
                    unitPrice: t.data.price || 0,
                    stock: t.data.stock
                }), e.totalPrice()) : wx.showModal({
                    title: "提示",
                    content: "未找到该商品",
                    showCancel: !1,
                    success: function(t) {
                        app.reTo("/sqtg_sun/pages/home/index/index")
                    }
                })
            }
        })
    },
    totalPrice: function() {
        var t = this,
            a = t.data.unitPrice,
            e = t.data.num,
            s = (parseFloat(a) * parseInt(e)).toFixed(2);
        t.setData({
            totalPrice: s
        })
    },
    spTap: function(t) {
        var a = this,
            e = a.data.protect,
            s = !1,
            o = t.currentTarget.dataset.index,
            i = t.currentTarget.dataset.idx,
            n = (t.currentTarget.dataset.id, a.data.goods);
        n.attrgroups[o].status = !0;
        for (var d = 0; d < n.attrgroups.length; d++) {
            if (1 != n.attrgroups[d].status) {
                s = !1;
                break
            }
            s = !0
        }
        n.attrgroups[o].attrs.forEach(function(t, a) {
            t.status = !1
        }), n.attrgroups[o].attrs[i].status = !0;
        for (var r = ",", c = "", u = 0; u < n.attrgroups.length; u++) for (var l = 0; l < n.attrgroups[u].attrs.length; l++) n.attrgroups[u].attrs[l].status && (r += n.attrgroups[u].attrs[l].id + ",", c += n.attrgroups[u].attrs[l].name + " ");
        e && s && (a.setData({
            protect: !1
        }), app.ajax({
            url: "Cgoods|getGoodsAttrs",
            data: {
                goods_id: a.data.id,
                attr_ids: r
            },
            success: function(t) {
                a.setData({
                    protect: !0
                }), 0 == t.code && (a.setData({
                    chooseGoods: t.data,
                    unitPrice: t.data[0].price,
                    stock: t.data[0].stock,
                    idGroup: r,
                    choicePic: t.data[0].pic
                }), a.totalPrice())
            },
            fail: function(t) {
                a.setData({
                    protect: !0
                }), app.tips(t.data.msg)
            }
        })), a.setData({
            goods: n,
            chooseSpec: c,
            isChecked: s
        })
    },
    addNum: function(t) {
        var a = t.currentTarget.dataset.num;
        this.data.stock <= a ? wx.showToast({
            title: "商品库存不足",
            icon: "none"
        }) : (this.setData({
            num: ++a
        }), this.totalPrice())
    },
    reduceNum: function(t) {
        var a = t.currentTarget.dataset.num;
        1 < a ? (this.setData({
            num: --a
        }), this.totalPrice()) : wx.showToast({
            title: "商品不得少于1件",
            icon: "none"
        })
    },
    formSubmit: function(t) {
        var a = this,
            e = a.data.buyNow,
            s = a.data.isChecked;
        a.data.num, a.data.stock, a.data.idGroup;
        s ? this.data.protect && (e ? a.buyCur() : a.addCarts()) : wx.showToast({
            title: "请选择规格",
            icon: "none"
        })
    },
    addCarts: function() {
        var e = this,
            t = wx.getStorageSync("userInfo"),
            a = e.data.goods;
        t ? app.ajax({
            url: "Ccart|joinCart",
            data: {
                user_id: t.id,
                leader_id: e.data.linkaddress.id,
                goods_id: a.id,
                store_id: a.store_id,
                num: e.data.num,
                attr_ids: a.use_attr ? e.data.idGroup : "",
                attr_names: a.use_attr ? e.data.chooseSpec : ""
            },
            success: function(t) {
                wx.showToast({
                    title: "加入购物车成功！",
                    icon: "none"
                }), e.setData({
                    addCount: ++e.data.addCount
                })
            }
        }) : wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/classifydetail/classifydetail?id=" + e.data.id);
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        })
    },
    buyCur: function() {
        var e = this;
        if (wx.getStorageSync("userInfo") || {}) {
            var t = e.data.num;
            if (e.data.stock < t) wx.showToast({
                title: "商品库存不足",
                icon: "none"
            });
            else {
                var a = e.data.goods;
                a.num = t, a.attr_ids = e.data.idGroup, a.attr_names = e.data.chooseSpec, a.price = e.data.unitPrice, a.goods_id = a.id, a.user_id = e.data.uInfo.id, e.data.newLeader ? a.leader_id = e.data.newleader_id : a.leader_id = e.data.linkaddress.id, a.use_attr ? a.pic = e.data.choicePic || a.pics[0] || a.pic : a.pics && a.pics.length && (a.pic = a.pics[0]), delete a.id, e.setData({
                    goodses: [a]
                }), app.navTo("/sqtg_sun/pages/zkx/pages/classifyorder/classifyorder")
            }
        } else wx.showModal({
            title: "提示",
            content: "您未登陆，请先登陆！",
            success: function(t) {
                if (t.confirm) {
                    var a = encodeURIComponent("/sqtg_sun/pages/zkx/pages/classifydetail/classifydetail?id=" + e.data.id);
                    app.reTo("/sqtg_sun/pages/home/login/login?id=" + a)
                } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index")
            }
        })
    },
    addCar: function(t) {
        var a = this,
            e = t.currentTarget.dataset.statu;
        if (a.data.goods.attrgroups.length < 1) a.data.addCount <= a.data.stock ? a.addCarts() : wx.showToast({
            title: "商品库存不足",
            icon: "none"
        });
        else {
            if ("open" != e) return !1;
            a.setData({
                omask: !0,
                addCarStatus: !0,
                buyNow: !1,
                showModalStatus: !0
            })
        }
    },
    buy: function(t) {
        var a = t.currentTarget.dataset.statu;
        if (this.data.goods.attrgroups.length < 1) this.buyCur();
        else {
            if ("open" != a) return !1;
            this.setData({
                omask: !0,
                addCarStatus: !1,
                buyNow: !0,
                showModalStatus: !0
            })
        }
    },
    close: function(t) {
        if ("close" != t.currentTarget.dataset.statu) return !1;
        this.setData({
            omask: !1,
            buyNow: !1,
            showModalStatus: !1
        })
    },
    shareCanvas: function() {
        var t = this,
            a = wx.getStorageSync("appConfig"),
            e = wx.getStorageSync("userInfo"),
            s = t.data.goods,
            o = [];
        o.gid = s.id, o.bname = s.name, o.url = t.data.imgroot, o.logo = s.pics[0], o.goodspicbg = a.goods_pic_b, o.price = s.price, o.original_price = s.original_price, o.stock = s.stock, o.sales_num = s.sales_num, o.scene = "id=" + t.data.id, o.scene += "&share_user_id=" + e.id, o.scene += "&leader_id=" + t.data.linkaddress.id, app.Func.func.creatPoster2("sqtg_sun/pages/zkx/pages/classifydetail/classifydetail", 430, o, 1, "shareImg"), t.setData({
            shareMask: !1
        })
    },
    hidden: function(t) {
        this.setData({
            hidden: !0
        })
    },
    save: function() {
        var a = this;
        wx.saveImageToPhotosAlbum({
            filePath: a.data.prurl,
            success: function(t) {
                console.log("成功"), wx.showModal({
                    content: "图片已保存到相册，赶紧晒一下吧~",
                    showCancel: !1,
                    confirmText: "好哒",
                    confirmColor: "#ef8200",
                    success: function(t) {
                        t.confirm && (console.log("用户点击确定"), a.setData({
                            hidden: !0
                        }))
                    }
                })
            },
            fail: function(t) {
                console.log("失败"), wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.writePhotosAlbum"] || (console.log("进入信息授权开关页面"), wx.openSetting({
                            success: function(t) {
                                console.log("openSetting success", t.authSetting)
                            }
                        }))
                    }
                })
            }
        })
    },
    gotofly: function(t, a) {
        var e = (t.data.neworder || []).length;
        e && (a < e && 0 <= a || (a = 0), this.slideupshow(t, 2e3, a, 80, 1), app.globalData.timer_slideupshoworder = setTimeout(function() {
            t.slideupshow(t, 0, a, -80, 0)
        }, 5e3))
    },
    slideupshow: function(t, a, e, s, o) {
        var i = t.data.neworder,
            n = wx.createAnimation({
                duration: a,
                timingFunction: "ease"
            });
        n.translateY(s).opacity(o).step(), i[e].neworderfly = n.export(), t.setData({
            neworder: i
        }), 0 == o && (e++, t.gotofly(t, e))
    },
    showwgtable: function(t) {
        var a = t.currentTarget.dataset.flag;
        this.setData({
            wg_flag: a
        })
    },
    unshare: function() {
        this.setData({
            shareMask: !1
        })
    },
    tapShare: function() {
        this.setData({
            shareMask: !0
        })
    },
    toIndex: function() {
        app.lunchTo("/sqtg_sun/pages/home/index/index")
    },
    onShareAppMessage: function(t) {
        var a = wx.getStorageSync("userInfo");
        return {
            title: this.data.goods.name,
            path: "/sqtg_sun/pages/zkx/pages/classifydetail/classifydetail?id=" + this.data.id + "&share_user_id=" + a.id + "&leader_id=" + this.data.linkaddress.id
        }
    },
    handler: function(t) {
        var s = this;
        t.detail.authSetting["scope.userLocation"] ? wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var a = t.latitude,
                    e = t.longitude;
                s.setData({
                    latitude: a,
                    longitude: e
                }), s.getStorelist(), s.setData({
                    popAllow: !1
                })
            }
        }) : console.log("获取地址失败")
    },
    allowAddress: function() {
        wx.getLocation({
            success: function(t) {
                console.log(t)
            },
            fail: function(t) {
                console.log(t)
            }
        })
    }
});