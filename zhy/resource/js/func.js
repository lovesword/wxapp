var func = {
    Beziercurve: function(e, o, t, n) {
        var s = this, l = e.data.winHei - 180;
        e.setData({
            posImg: !0,
            imgLef: o,
            imgTop: t
        });
        var i = 0;
        n++;
        var a = setInterval(function() {
            i++, e.setData({
                imgLef: s.getx(o, 40, i, 50),
                imgTop: s.gety(t, l, i, 50)
            }), 50 < i && (n--, clearInterval(a), e.setData({
                posImg: 0 < n
            }), i = 0);
        }, 1);
    },
    gety: function(e, o, t, n) {
        return e + Math.abs(e - o) * Math.pow(t / n, 4);
    },
    getx: function(e, o, t, n) {
        return e - Math.abs(e - o) * t / n;
    },
    decodeScene: function(e) {
        if (e.scene) for (var o = e, t = decodeURIComponent(e.scene).split("&"), n = 0; n < t.length; n++) {
            var s = t[n].split("=");
            o[s[0]] = s[1];
        } else o = e;
        return o;
    },
    creatPoster: function(e, o, i, t, a) {
        console.log("-------------------");
        var n = getApp(), c = n, s = getCurrentPages(), r = s[s.length - 1], g = (r.__route__, 
        n.siteInfo.siteroot.split("/app/")[0] + "/attachment/"), u = "";
        wx.showLoading({
            title: "获取图片中..."
        });
        var l = i.gid ? i.gid : 0, f = i.scene;
        wx.request({
            url: n.siteInfo.siteroot + "?i=" + n.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|GetwxCode&m=sqtg_sun",
            header: {
                "content-type": "application/json"
            },
            data: {
                scene: f,
                page: e,
                width: o,
                gid: l
            },
            success: function(l) {
                console.log("获取小程序二维码"), console.log(l.data), u = l.data;
                var e = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: i.url + i.logo,
                        success: function(e) {
                            console.log("图片缓存1"), console.log(e), o(e.path);
                        },
                        fail: function(e) {
                            console.log("图片1保存失败"), o(i.url + i.logo), console.log(e);
                        }
                    });
                }), o = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: g + u,
                        success: function(e) {
                            wx.request({
                                url: c.siteInfo.siteroot + "?i=" + c.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|DelwxCode&m=sqtg_sun",
                                data: {
                                    imgurl: u
                                },
                                success: function(e) {
                                    console.log(e.data), console.log("删除缓存成功");
                                }
                            }), console.log("图片缓存2"), console.log(e), o(e.path);
                        },
                        fail: function(e) {
                            wx.request({
                                url: c.siteInfo.siteroot + "?i=" + c.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|DelwxCode&m=sqtg_sun",
                                data: {
                                    imgurl: u
                                },
                                success: function(e) {
                                    console.log(e.data);
                                }
                            }), console.log("图片2保存失败"), o(g + u), console.log(e);
                        }
                    });
                });
                Promise.all([ e, o ]).then(function(e) {
                    console.log(e), console.log("进入 promise"), console.log(l);
                    var o = wx.createCanvasContext(a), t = i.bname, n = e[0], s = e[1];
                    o.rect(0, 0, 600, 952), o.setFillStyle("#fff"), o.fill(), o.drawImage(n, 0, 0, 600, 600), 
                    o.setFillStyle("#000"), o.setFontSize(30), c.Func.func.drawText(t, 15, 600, 500, o), 
                    console.log(t.length), o.setFillStyle("#e9472c"), o.setFontSize(22), o.fillText("￥", 15, 703), 
                    o.setFillStyle("#e9472c"), o.setFontSize(36), o.fillText(i.price, 37, 700), o.drawImage("/zhy/resource/images/zhiwen.png", 90, 730, 130, 130), 
                    o.setFontSize(22), o.setFillStyle("#999"), o.fillText("长按识别二维码进入", 60, 900), o.drawImage(s, 330, 690, 210, 210), 
                    o.stroke(), o.draw(), console.log("结束 promise"), wx.hideLoading(), wx.showLoading({
                        title: "开始生成海报..."
                    }), console.log("生成中"), new Promise(function(e, o) {
                        setTimeout(function() {
                            e("second ok");
                        }, 500);
                    }).then(function(e) {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 602,
                            height: 952,
                            destWidth: 602,
                            destHeight: 952,
                            canvasId: a,
                            success: function(e) {
                                console.log("进入 canvasToTempFilePath"), r.setData({
                                    prurl: e.tempFilePath,
                                    hidden: !1
                                }), wx.hideLoading();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    });
                });
            }
        });
    },
    creatPoster2: function(e, o, c, t, r) {
        console.log("-------------------");
        var n = getApp(), g = n, s = getCurrentPages(), u = s[s.length - 1], l = (u.__route__, 
        n.siteInfo.siteroot.split("/app/")[0] + "/attachment/"), i = "";
        wx.showLoading({
            title: "获取图片中..."
        });
        var a = c.gid ? c.gid : 0, f = c.scene, d = wx.getStorageSync("userInfo");
        wx.request({
            url: n.siteInfo.siteroot + "?i=" + n.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|GetwxCode&m=sqtg_sun",
            header: {
                "content-type": "application/json"
            },
            data: {
                scene: f,
                page: e,
                width: o,
                gid: a
            },
            success: function(a) {
                console.log("获取小程序二维码"), i = a.data;
                var e = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: c.url + c.logo,
                        success: function(e) {
                            console.log("banner图片"), o(e.path);
                        },
                        fail: function(e) {
                            console.log("banner图片保存失败"), o(c.url + c.logo), console.log(e);
                        }
                    });
                }), o = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: c.url + c.goodspicbg,
                        success: function(e) {
                            console.log("海报背景图"), o(e.path);
                        },
                        fail: function(e) {
                            console.log("海报背景图保存失败"), o(c.url + c.goodspicbg), console.log(e);
                        }
                    });
                }), t = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: d.img,
                        success: function(e) {
                            console.log("用户头像缓存"), o(e.path);
                        },
                        fail: function(e) {
                            console.log("用户头像缓存失败"), o(d.img), console.log(e);
                        }
                    });
                }), n = new Promise(function(o, e) {
                    wx.getImageInfo({
                        src: l + i,
                        success: function(e) {
                            wx.request({
                                url: g.siteInfo.siteroot + "?i=" + g.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|DelwxCode&m=sqtg_sun",
                                data: {
                                    imgurl: i
                                },
                                success: function(e) {
                                    console.log("删除缓存成功");
                                }
                            }), console.log("图片缓存2"), o(e.path);
                        },
                        fail: function(e) {
                            wx.request({
                                url: g.siteInfo.siteroot + "?i=" + g.siteInfo.uniacid + "&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Cuser|DelwxCode&m=sqtg_sun",
                                data: {
                                    imgurl: i
                                },
                                success: function(e) {
                                    console.log(e.data);
                                }
                            }), console.log("图片2保存失败"), o(l + i), console.log(e);
                        }
                    });
                });
                Promise.all([ e, n, t, o ]).then(function(e) {
                    console.log(e), console.log("进入 promise"), console.log(a);
                    var o = wx.createCanvasContext(r), t = c.bname, n = e[0], s = e[1], l = e[2], i = e[3];
                    o.rect(0, 0, 750, 1234), o.setStrokeStyle("rgba(0,0,0,0)"), o.drawImage(i, 0, 0, 750, 1334), 
                    o.beginPath(), o.rect(30, 260, 690, 870), o.setStrokeStyle("rgba(0,0,0,0)"), o.setFillStyle("#fff"), 
                    o.fill(), o.drawImage(n, 60, 150, 630, 630), o.setFillStyle("#000"), g.Func.func.drawText(t, 65, 780, 600, o), 
                    o.drawImage(l, 85, 890, 70, 70), o.setFillStyle("#222"), o.setFontSize(28), o.fillText(d.name, 180, 910), 
                    o.setFillStyle("#e5bb03"), o.setFontSize(20), o.fillText("向您推荐", 180, 945), o.setFillStyle("#e9472c"), 
                    o.setFontSize(22), o.drawImage("/zhy/resource/images/group.png", 75, 995, 100, 48), 
                    o.fillText("￥", 73, 1073), o.setFillStyle("#e9472c"), o.setFontSize(32), o.fillText(c.price, 97, 1060), 
                    o.drawImage(s, 475, 890, 200, 200), o.stroke(), o.draw(), console.log("结束 promise"), 
                    wx.hideLoading(), wx.showLoading({
                        title: "开始生成海报..."
                    }), console.log("生成中"), new Promise(function(e, o) {
                        setTimeout(function() {
                            e("second ok");
                        }, 500);
                    }).then(function(e) {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 750,
                            height: 1234,
                            destWidth: 750,
                            destHeight: 1234,
                            canvasId: r,
                            success: function(e) {
                                console.log("进入 canvasToTempFilePath"), u.setData({
                                    prurl: e.tempFilePath,
                                    hidden: !1
                                }), wx.hideLoading();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    });
                });
            }
        });
    },
    drawText: function(e, o, t, n, s) {
        var l = e.split(""), i = "", a = [];
        s.font = "28rpx Arial", s.fillStyle = "#222222", s.textBaseline = "middle";
        for (var c = 0; c < l.length; c++) s.measureText(i).width < n ? i += l[c] : (c--, 
        a.push(i), i = "");
        if (a.push(i), 2 < a.length) {
            var r = a.slice(0, 2), g = r[1], u = "", f = [];
            for (c = 0; c < g.length - 3 && s.measureText(u).width < n; c++) u += g[c];
            f.push(u);
            var d = f[0] + "...";
            r.splice(1, 1, d), a = r;
        }
        for (var p = 0; p < a.length; p++) s.fillText(a[p], o, t + 36 * (p + 1));
    }
};

module.exports = {
    func: func
};