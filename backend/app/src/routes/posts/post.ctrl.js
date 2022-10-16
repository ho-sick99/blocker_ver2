"use strict";

const Post = require("../../model/Post/Post");


// 게시글 관련 API 
const post_sys = {
    post_load: async (req, res) => {
        const bodyData = new Post(); // User id를 인수로 전달
        const load_res = await bodyData.load_post();
        
        return res.send(load_res);
    },
    post_view: async (req, res) => {
        const bodyData = new Post(req.body);
        const post_res = await bodyData.post_view();

        return res.send(post_res);
    },
    post_add: async (req, res) => {
        const bodyData = new Post(req.body);
        const add_res = await bodyData.add_post();

        return res.send(add_res);
    },
    post_upd: async (req, res) => {
        const bodyData = new Post(req.body);
        const upd_res = await bodyData.update_post();

        return res.send(upd_res);
    },
    post_del: async (req, res) => {
        const bodyData = new Post(req.body);
        const del_res = await bodyData.delete_post();

        return res.send(del_res);
    },

}

module.exports = {
    post_sys,
};
