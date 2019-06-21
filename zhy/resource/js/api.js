function getTimeStr(t) {
    return t = (t = t.replace(/-/g, ":").replace(" ", ":")).split(":"), new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]).getTime() / 1e3;
}

var api = require("./baseapi");

api.getCpinBanner = function() {
    return this.post("Cpin|banner");
}, api.getCpinClassifyList = function() {
    return this.post("Cpin|classifyList").then(function(a) {
        return a.data.unshift({
            id: 0,
            name: "热销"
        }), a.data.forEach(function(t, i) {
            a.data[i].is_hot = i ? 0 : 1;
        }), Promise.resolve(a);
    });
}, api.getCpinGoodsList = function(t) {
    var e = new Date().getTime() / 1e3;
    return this.post("Cpin|goodsList", t, 0, !1).then(function(a) {
        return a.data.forEach(function(t, i) {
            e < t.start_time ? a.data[i].btn_status = 1 : e >= t.start_time && e < t.end_time ? a.data[i].btn_status = 2 : a.data[i].btn_status = 3;
        }), Promise.resolve(a);
    });
}, api.getCpinGoodsDetails = function(t) {
    var d = this;
    new Date().getTime();
    return this.post("Cpin|goodsDetails", t, 0, !1).then(function(i) {
        if (0 < i.data.use_attr) {
            var a = ",", e = ",", t = "";
            for (var n in i.data.attr_group_list) a += i.data.attr_group_list[n].attr_list[0].id + ",", 
            e += i.data.attr_group_list[n].attr_list[0].name + ",", i.data.attr_group_list[n].attr_list[0].choose = !0, 
            t += i.data.attr_group_list[n].attr_list[0].name + " ";
            i.data.choose_name = t;
            var r = {
                goods_id: i.data.id,
                attr_ids: a
            };
            return d.getCpinGetAttrInfo(r).then(function(t) {
                return i.data.choose_type = t.data, i.data.attr_list = e, i.data.attr_ids = a, i.data.ladder_id = 0, 
                i.data.groupnum = i.data.need_num, i.data.groupmoney = t.data.pin_price, i.data.reduce_mopney = "拼团立省： ￥" + (i.data.original_price - t.data.pin_price).toFixed(2), 
                Promise.resolve(i);
            });
        }
        var o = {
            id: 0,
            goods_id: i.data.id,
            stock: i.data.stock,
            price: i.data.price,
            weight: i.data.weight,
            pic: i.data.pic,
            pin_price: i.data.pin_price
        };
        return i.data.attr_list = "", i.data.attr_ids = "", 0 < i.data.is_ladder ? i.data.ladder_info ? (i.data.ladder_info[0].choose = !0, 
        i.data.reduce_mopney = "拼团立省： ￥" + (i.data.original_price - i.data.ladder_info[0].groupmoney).toFixed(2), 
        i.data.ladder_id = i.data.ladder_info[0].id, i.data.groupnum = i.data.ladder_info[0].groupnum, 
        i.data.groupmoney = i.data.ladder_info[0].groupmoney, o.pin_price = i.data.ladder_info[0].groupmoney) : i.data.reduce_mopney = "阶梯团数据不完整，请商家设置！" : (i.data.ladder_id = 0, 
        i.data.groupnum = i.data.need_num, i.data.groupmoney = i.data.pin_price, i.data.reduce_mopney = "拼团立省： ￥" + (i.data.original_price - i.data.pin_price).toFixed(2)), 
        i.data.choose_type = o, Promise.resolve(i);
    });
}, api.getCpinGetAttrInfo = function(t) {
    return this.post("Cpin|getAttrInfo", t, 0, !1);
}, api.getCpinGetDistribution = function(t) {
    return this.post("Cpin|getDistribution", t, 0, !1);
}, api.getCpinGetBuy = function(t) {
    return this.post("Cpin|getBuy", t, 0, !1);
}, api.getCpinJoinGroup = function(t) {
    return this.post("Cpin|joinGroup", t, 0, !1);
}, api.getCpinOrderDetails = function(t) {
    return this.post("Cpin|orderDetails", t, 0, !1);
}, api.getCpinAgainPay = function(t) {
    return this.post("Cpin|againPay", t, 0, !1);
}, api.getCpinBalancePay = function(t) {
    return this.post("Cpin|balancePay", t, 0, !1);
}, api.getCpinJoinPage = function(t) {
    return this.post("Cpin|joinPage", t, 0, !1).then(function(t) {
        var i = new Date().getTime() / 1e3 - getTimeStr(t.data.headinfo.create_time), a = 3600 * (t.data.goodsinfo.group_time - 0), e = t.data.headinfo.groupnum, n = t.data.grouppaynum, r = t.data.groupnum;
        return t.data.btn_status = 0, t.data.btn_status = e <= n ? 2 : 0 < a - i ? e <= r ? 1 : 0 : 3, 
        Promise.resolve(t);
    });
}, api.getCpinOrderList = function(t) {
    return this.post("Cpin|orderList", t, 0, !1);
}, api.getCpinCancleOrd = function(t) {
    return this.post("Cpin|cancleOrd", t, 0, !1);
}, api.getCpinConfirmOrd = function(t) {
    return this.post("Cpin|confirmOrd", t, 0, !1);
}, api.getCpinGetRules = function() {
    return this.post("Cpin|getRules");
}, api.getCpinAddComment = function(t) {
    return this.post("Cpin|addComment", t, 0, !1);
}, api.getCpinUseOrd = function(t) {
    return this.post("Cpin|useOrd", t, 0, !1);
}, api.getcseckillGetOrder = function(t) {
    return this.post("Cseckill|getOrder", t, 0, !1);
}, api.getcseckillverifyorder = function(t) {
    return this.post("Cseckill|verifyOrder", t, 0, !1);
}, api.getCpinOrdernumFind = function(t) {
    return this.post("Cpin|ordernumFind", t, 0, !1);
}, api.getCstoreGetStore = function(t) {
    return this.post("Cstore|getStore", t, 0, !1);
}, module.exports = api;