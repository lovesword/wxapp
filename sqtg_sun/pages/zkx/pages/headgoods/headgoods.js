/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        checkNum: 0,
        curHdIndex: 0,
        show: !1,
        page: 1,
        limit: 5,
        olist: [],
        nav: [{
            title: "可选商品",
            state: 0
        }, {
            title: "在售商品",
            state: 1
        }],
        choicechecked: !1,
        check: {
            checkAll: !1
        },
        protect: !0
    },
    onLoad: function(a) {
        this.setData({
            curHdIndex: a.state ? a.state : 0,
            leader_id: a.leader_id
        })
    },
    onShow: function() {
        this.setData({
            check: {
                checkAll: !1
            },
            choicechecked: !1
        }), this.setData({
            page: 1
        }), this.loadData()
    },
    loadData: function() {
        var s = this,
            d = s.data.olist,
            c = s.data.limit,
            i = s.data.page;
        app.ajax({
            url: "Cleader|getGoodses",
            data: {
                leader_id: s.data.leader_id,
                page: i,
                limit: c,
                state: s.data.curHdIndex
            },
            success: function(a) {
                var t = !(a.data.length < c);
                if (1 == i) d = a.data;
                else for (var e in a.data) d.push(a.data[e]);
                i += 1, s.setData({
                    olist: d,
                    show: !0,
                    hasMore: t,
                    page: i,
                    imgroot: a.other.img_root
                })
            }
        })
    },
    swichNav: function(a) {
        var t = this,
            e = a.currentTarget.dataset.state,
            s = t.data.olist,
            d = t.data.check;
        d.checkAll = !1, t.setData({
            curHdIndex: e,
            page: 1,
            check: d
        }), s.forEach(function(a, t) {
            a.status = d.checkAll
        }), this.loadData()
    },
    onReachBottom: function() {
        this.data.hasMore ? this.loadData() : wx.showToast({
            title: "没有更多商品啦~",
            icon: "none"
        })
    },
    choice: function() {
        this.setData({
            choicechecked: !this.data.choicechecked
        })
    },
    getSinglePlat: function(a) {
        var t = this,
            e = t.data.checkNum,
            s = t.data.olist,
            d = a.currentTarget.dataset.index;
        s[d].status = !s[d].status, s[d].status ? e++ : e--, t.setData({
            checkNum: e,
            olist: s
        })
    },
    getAllGoods: function(a) {
        var t = this,
            e = (t.data.check, t.data.olist),
            s = t.data.checkNum == e.length;
        e.forEach(function(a, t) {
            a.status = !s
        }), t.setData({
            checkNum: s ? 0 : e.length,
            olist: e
        })
    },
    addChoice: function() {
        var t = this,
            a = t.data.olist,
            e = t.data.leader_id,
            s = [];
        a.forEach(function(a) {
            a.status && s.push(a.id)
        }), app.ajax({
            url: "Cleader|addGoods",
            data: {
                leader_id: e,
                goods_ids: s
            },
            success: function(a) {
                app.tips(a.data), t.setData({
                    page: 1
                }), t.loadData()
            }
        })
    },
    deleteGoods: function() {
        var t = this,
            a = t.data.olist,
            e = t.data.leader_id,
            s = [];
        a.forEach(function(a) {
            a.status && s.push(a.id)
        }), app.ajax({
            url: "Cleader|deleteGoods",
            data: {
                leader_id: e,
                goods_ids: s
            },
            success: function(a) {
                app.tips(a.data), t.setData({
                    page: 1
                }), t.loadData()
            }
        })
    }
});