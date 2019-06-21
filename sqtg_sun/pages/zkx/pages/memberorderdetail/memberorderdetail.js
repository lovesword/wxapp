/*   time:2018-12-22 16:34:45*/
var app = getApp();
Page({
    data: {
        show: !1
    },
    onLoad: function(a) {
        this.setData({
            state: a.state,
            goods_id: a.id,
            batch_no: a.batch_no,
            leader_id: a.leaderid
        }), this.loadData()
    },
    loadData: function() {
        var t = this;
        app.ajax({
            url: "Cleader|getOrder",
            data: {
                leader_id: t.data.leader_id,
                state: t.data.state,
                goods_id: t.data.goods_id,
                batch_no: t.data.batch_no
            },
            success: function(a) {
                t.setData({
                    show: !0,
                    olist: a.data,
                    imgroot: a.other.img_root
                })
            }
        })
    },
    onPhoneTab: function(a) {
        var t = a.currentTarget.dataset.index;
        wx.makePhoneCall({
            phoneNumber: this.data.olist.users[t].user.tel
        })
    }
});