"use strict";

const PostStorage = require("./PostStorage");

class Post {
    constructor(body) {
        this.body = body;
    }

    async load_post() { // 게시글 리스트 로드
        try {
            const response = await PostStorage.load_post();
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
    async load_mypost() {
        const clientData = this.body;
        try {
            const response = await PostStorage.load_mypost(clientData.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
    async post_view() {
        const clientData = this.body;
        try {
            const response = await PostStorage.get_post_info(clientData.post_id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async add_post() {
        const clientData = this.body;
        try {
            const response = await PostStorage.insert_post(clientData);
            return response;
        } catch (err) {
            return { success: false, err };
        }

    }

    async update_post() {
        const clientData = this.body;
        try {
            const response = await PostStorage.update_post(clientData); // 유저 정보 저장 시도
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async delete_post() {
        const clientData = this.body;
        try {
            const response = await PostStorage.delete_post(clientData.post_id); // 유저 정보 저장 시도
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }


}


module.exports = Post;
