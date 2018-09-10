const Post = require('models/post');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return null;
    }

    return next();
};

exports.write = async (ctx) => {
    const { title, body, tags } = ctx.request.body;
    
    const post = new Post({
        title, body, tags
    });

    try {
        await post.save(); //데이터베이스에 등록합니다.
        ctx.body = post; // 저장된 결과를 반환합니다.
    } catch(e) {
        //데이터베이스의 오류가 발생합니다.
        ctx.throw(e, 500);
    }
};

exports.list = async(ctx) => {
    try{
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.read = async(ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true

        }).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};