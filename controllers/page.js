const User = require("../models/user");
const Post = require("../models/post");
const Story = require("../models/story");
const Diary = require("../models/diary");
//서비스를 호출하는 코\\

const PostComment = require("../models/postComment");
const StoryComment = require("../models/storyComment");
const DiaryComment = require("../models/diaryComment");
const { post } = require("../routes/user");

exports.renderMain = async (req, res, next) => {
  const otherUserId = req.params.userId;

  if (otherUserId) {
    const user = await User.findOne({
      where: { id: otherUserId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        }, //팔로잉git
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        }, //팔로워
      ],
    });

    const posts = await Post.findAll({
      where: {
        UserId: otherUserId,
      },
    });

    const diaries = await Diary.findAll({
      where: {
        UserId: otherUserId,
      },
    });

    res.send({
      id: user.dataValues.id,
      img: user.dataValues.profileImg,
      createdAt: user.dataValues.createdAt,
      nickname: user.dataValues.nickname,
      email: user.dataValues.email,
      Followers: user.dataValues.Followers,
      Followings: user.dataValues.Followings,
      postslength: posts.length,
      diarieslength: diaries.length,
    });
  }
  if (!otherUserId) {
    const following = res.locals.followingCount;
    const follower = res.locals.followerCount;
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      const posts = await Post.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      const diaries = await Diary.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      res.send({
        id: user.dataValues.id,
        img: user.dataValues.profileImg,
        createdAt: user.dataValues.createdAt,
        nickname: user.dataValues.nickname,
        email: user.dataValues.email,
        follower,
        following,
        postslength: posts.length,
        diarieslength: diaries.length,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};

exports.renderPosts = async (req, res, next) => {
  const userId = req.params.userId;

  if (userId) {
    try {
      const posts = await Post.findAll({
        where: {
          UserId: userId,
        },
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
      });

      res.send(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  if (!userId) {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
      });
      const onlyInfoPosts = posts.map((post) => post.dataValues);

      res.send(onlyInfoPosts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};

exports.renderOnlyPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findAll({
      where: { id: postId },
    });

    res.send(post);
  } catch (error) {
    console.error(error);
  }
};

exports.renderPostsComments = async (req, res, next) => {
  try {
    const postsComments = await PostComment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    const onlyInfoPostsComments = postsComments.map(
      (comments) => comments.dataValues
    );
    res.send(onlyInfoPostsComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderPostReplyComments = async (req, res, next) => {
  const postCommentId = req.params.commentId;
  try {
    const replyComments = await PostComment.findAll({
      where: { PostCommentId: postCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const onlyInfoPostReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoPostReplyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderOnlyComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await PostComment.findAll({
      where: { id: commentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    res.send(comment);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStory = async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    const onlyInfoStory = stories.map((story) => story.dataValues);
    res.send(onlyInfoStory);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryComments = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    const storyComments = await StoryComment.findAll({
      where: {
        StoryId: storyId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    res.send(storyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderMoreStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  try {
    const moreStory = await Story.findAll({
      where: {
        id: storyId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    res.send(moreStory);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryReplyComments = async (req, res, next) => {
  const storyCommentId = req.params.commentId;

  try {
    const replyComments = await StoryComment.findAll({
      where: { StoryCommentId: storyCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const onlyInfoStoryReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoStoryReplyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaries = async (req, res, next) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const diaries = await Diary.findAll({
        where: {
          UserId: userId,
        },
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
      });

      const onlyInfoDiaries = diaries.map((diary) => diary.dataValues);
      res.send(onlyInfoDiaries);
    } catch (error) {
      console.error(error);
    }
  }

  if (!userId) {
    try {
      const diaries = await Diary.findAll({
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
      });

      const onlyInfoDiaries = diaries.map((diary) => diary.dataValues);
      res.send(onlyInfoDiaries);
    } catch (error) {
      console.error(error);
    }
  }
};

exports.renderMoreDiary = async (req, res, next) => {
  const diaryId = req.params.diaryId;

  try {
    const moreDiary = await Diary.findAll({
      where: {
        id: diaryId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    res.send(moreDiary);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaryComments = async (req, res, next) => {
  const diaryId = req.params.diaryId;
  try {
    const comments = await DiaryComment.findAll({
      where: {
        diaryId: diaryId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    res.send(comments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaryReplyComments = async (req, res, next) => {
  const diaryCommentId = req.params.commentId;

  try {
    const replyComments = await DiaryComment.findAll({
      where: { DiaryCommentId: diaryCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const onlyInfoDiaryReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoDiaryReplyComments);
  } catch (error) {
    console.error(error);
  }
};
/*

exports.renderStoryComments = async(req,res,next)=> {
  try{
    const storyComments = await StoryComment.findAll()

  } catch(error){

  }
}*/
