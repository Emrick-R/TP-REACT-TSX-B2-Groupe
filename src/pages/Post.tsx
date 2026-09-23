import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import type { RootState, AppDispatch } from "../store/store.ts";
import { addComment, deleteComment } from "../store/reducers/comment.ts";
import type { Comment } from "../types/comment.ts";
import "./css/Post.css";

function Post() {
    let navigate = useNavigate()
    let { postid } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const posts = useSelector((state: RootState) => state.post.posts)
    const users = useSelector((state: RootState) => state.user.users)
    const comments = useSelector((state: RootState) => state.comment.comments)
    const userLogged = useSelector((state: RootState) => state.userLogged.userLogged)
    const post = posts.find((p) => Number(postid) === p.id)
    const [newComment, setNewComment] = useState("")

    if (!post) {
        navigate("/404")
        return null
    }

    const auteur = users.find((u) => u.id === post.userId)
    const postComments = comments.filter((c) => c.postId === post.id)

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        try {
            const response = await axios.post<Comment>("https://dummyjson.com/comments/add", {
                body: newComment,
                postId: post.id,
                userId: userLogged?.id ?? 1,
            })
            dispatch(addComment({
                ...response.data,
                id: Date.now(),
                user: {
                    id: userLogged?.id ?? 1,
                    username: userLogged?.username ?? "moi",
                    fullName: userLogged ? `${userLogged.firstName} ${userLogged.lastName}` : undefined,
                },
            }))
            setNewComment("")
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteComment = async (id: number) => {
        try {
            await axios.delete(`https://dummyjson.com/comments/${id}`)
        } catch (err) {
            console.log(err)
        }
        dispatch(deleteComment(id))
    }

    return (
        <section className="page">
            <div className="post-detail">
                <h1>{post.title}</h1>
                <div className="post-meta">
                    <span>{post.reactions?.likes ?? 0} likes</span>
                    <span>{post.reactions?.dislikes ?? 0} dislikes</span>
                    <span>{post.views ?? 0} vues</span>
                    <span>Par {auteur?.username ?? `User #${post.userId}`}</span>
                </div>

                <p className="post-body">{post.body}</p>

                <h2 className="post-section-title">Tags</h2>
                <ul className="post-tags-list">
                    {post.tags.map((tag) =>
                        <li key={tag}>
                            <span className="post-tag">#{tag}</span>
                        </li>
                    )}
                </ul>

                <h2 className="post-section-title">Commentaires ({postComments.length})</h2>

                {userLogged &&
                    <form className="comment-form" onSubmit={handleAddComment}>
                        <textarea
                            placeholder="Écrire un commentaire..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit" className="btn-primary">Envoyer</button>
                    </form>
                }

                <ul className="comment-list">
                    {postComments.map((c) =>
                        <li key={c.id} className="comment-item">
                            <div className="comment-header">
                                <strong>{c.user.username}</strong>
                                {userLogged?.id === c.user.id &&
                                    <button
                                        className="btn-delete-small"
                                        onClick={() => handleDeleteComment(c.id)}
                                    >
                                        Supprimer
                                    </button>
                                }
                            </div>
                            <p>{c.body}</p>
                        </li>
                    )}
                </ul>

                <button onClick={() => navigate(-1)} className="btn-back">Retour</button>
            </div>
        </section>
    );
}

export default Post;
