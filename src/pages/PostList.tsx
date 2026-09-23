import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import type { RootState, AppDispatch } from "../store/store.ts";
import { addPost, deletePost } from "../store/reducers/post.ts";
import { deleteCommentsByPost } from "../store/reducers/comment.ts";
import type { Post } from "../types/post.ts";
import "./css/Post.css";

function PostList() {
    const posts = useSelector((state: RootState) => state.post.posts)
    const userLogged = useSelector((state: RootState) => state.userLogged.userLogged)
    const dispatch = useDispatch<AppDispatch>()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tagsInput, setTagsInput] = useState("")

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !body.trim()) return
        const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
        try {
            const response = await axios.post<Post>("https://dummyjson.com/posts/add", {
                title,
                body,
                tags,
                userId: userLogged?.id ?? 1,
            })
            dispatch(addPost({
                ...response.data,
                id: Date.now(),
                userId: (userLogged?.id ?? 1) as number,
                tags,
                reactions: { likes: 0, dislikes: 0 },
                views: 0,
            }))
            setTitle("")
            setBody("")
            setTagsInput("")
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://dummyjson.com/posts/${id}`)
        } catch (err) {
            console.log(err)
        }
        dispatch(deletePost(id))
        dispatch(deleteCommentsByPost(id))
    }

    return (
        <section className="page">
            {userLogged &&
                <form className="post-form" onSubmit={handleAdd}>
                    <h3>Nouveau post</h3>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Contenu"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tags séparés par des virgules"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                    />
                    <button type="submit" className="btn-primary">Publier</button>
                </form>
            }
            <h2>Liste des posts</h2>
            <div className="card-grid">
                {posts.map((post) =>
                    <div key={post.id} className="post-item">
                        <Link to={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                            <div className="post-tags">
                                {post.tags.map((tag) =>
                                    <span key={tag} className="post-tag">#{tag}</span>
                                )}
                            </div>
                            <p className="post-list-meta">
                                {post.reactions?.likes ?? 0} likes · {post.reactions?.dislikes ?? 0} dislikes · {post.views ?? 0} vues
                            </p>
                        </Link>
                        {userLogged?.id === post.userId &&
                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(post.id)}
                            >
                                Supprimer
                            </button>
                        }
                    </div>
                )}
            </div>
        </section>
    );
}

export default PostList;
