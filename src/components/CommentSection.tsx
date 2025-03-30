
import React, { useState } from 'react';
import { Heart, Reply } from 'lucide-react';
import type { Comment, Reply as ReplyType } from '../services/blogService';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [visibleReplyForm, setVisibleReplyForm] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleLikeComment = (commentId: string) => {
    if (likedComments.has(commentId)) {
      // Unlike
      setLikedComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    } else {
      // Like
      setLikedComments(prev => new Set(prev).add(commentId));
      toast({
        title: "Comment liked!",
        description: "You liked this comment.",
      });
    }
  };

  const handleLikeReply = (replyId: string) => {
    if (likedReplies.has(replyId)) {
      // Unlike
      setLikedReplies(prev => {
        const newSet = new Set(prev);
        newSet.delete(replyId);
        return newSet;
      });
    } else {
      // Like
      setLikedReplies(prev => new Set(prev).add(replyId));
      toast({
        title: "Reply liked!",
        description: "You liked this reply.",
      });
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      toast({
        title: "Comment submitted!",
        description: "Your comment has been posted.",
      });
      setCommentContent('');
    } else {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitReply = (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      toast({
        title: "Reply submitted!",
        description: "Your reply has been posted.",
      });
      setReplyContent('');
      setVisibleReplyForm(null);
    } else {
      toast({
        title: "Empty reply",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="bg-white shadow-sm rounded-lg p-5 mb-4">
      <div className="flex items-start">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div className="font-medium">{comment.author.name}</div>
            <div className="text-gray-500 text-sm">{formatDate(comment.date)}</div>
          </div>
          <div className="text-gray-700 mb-3">{comment.content}</div>
          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center text-sm ${
                likedComments.has(comment.id) ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-500 transition-colors`}
              onClick={() => handleLikeComment(comment.id)}
            >
              <Heart size={16} className="mr-1" />
              <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
            </button>
            <button
              className="flex items-center text-sm text-gray-500 hover:text-blog-primary transition-colors"
              onClick={() => setVisibleReplyForm(comment.id)}
            >
              <Reply size={16} className="mr-1" />
              <span>Reply</span>
            </button>
          </div>

          {/* Reply Form */}
          {visibleReplyForm === comment.id && (
            <form onSubmit={(e) => handleSubmitReply(comment.id, e)} className="mt-4">
              <textarea
                placeholder="Write your reply..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
                rows={3}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setVisibleReplyForm(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blog-primary text-white rounded-md hover:bg-blog-hover"
                >
                  Post Reply
                </button>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              {comment.replies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ReplyItem = ({ reply }: { reply: ReplyType }) => (
    <div className="py-3">
      <div className="flex items-start">
        <img
          src={reply.author.avatar}
          alt={reply.author.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div className="font-medium">{reply.author.name}</div>
            <div className="text-gray-500 text-xs">{formatDate(reply.date)}</div>
          </div>
          <div className="text-gray-700 text-sm mb-2">{reply.content}</div>
          <button
            className={`flex items-center text-xs ${
              likedReplies.has(reply.id) ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-500 transition-colors`}
            onClick={() => handleLikeReply(reply.id)}
          >
            <Heart size={14} className="mr-1" />
            <span>{reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-serif font-bold text-blog-primary mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <textarea
          placeholder="Share your thoughts..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
          rows={4}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-6 py-2 bg-blog-primary text-white rounded-md hover:bg-blog-hover transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        ) : (
          <div className="text-center py-10 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
