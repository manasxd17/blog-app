import React, { useState } from 'react'
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
export default function BlogPage({ user }) {
    let i = 1;
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Blogs, setBlogs] = useState(null)
    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const descHandler = (event) => {
        setDescription(event.target.value);
    }

    const onPublish = async (event) => {
        event.preventDefault();
        try {
            const publish = await db.collection('blogs').add({
                author: user.email,
                title: Title,
                description: Description,
            })
            if (publish !== null) {
                alert(`Blog data saved.`);
                setTitle('');
                setDescription('');
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    const getData = async () => {
        try {
            const res = await db.collection('blogs').get();
            const blogs = res.docs.map((doc) => {
                return {
                    id: doc.id,
                    creator:doc.data().author,
                    title: doc.data().title,
                    description: doc.data().description
                }
            })
            setBlogs(blogs);
        }
        catch (err) {
            alert(err.message);
        }

    }

    const getmyData = async () => {
        try {
            const res = await db.collection('blogs').where("author", "==", user.email).get()
            const blogs = res.docs.map((doc) => {
                return {
                    id: doc.id,
                    creator:doc.data().author,
                    title: doc.data().title,
                    description: doc.data().description
                }
            })
            setBlogs(blogs)
        }
        catch (err) {
            alert(err.message);
        }
    }
    return (
        <div>
            {
                user === null ?
                    <div>
                        <h1 style={{ fontFamily: "Brush Script MT,cursive", textAlign: "center" }}>Please <Link to="/">login</Link> first and then try rendering</h1>
                    </div>
                    :
                    <div>
                        <div>
                            <Navbar getData={getData} personalData={getmyData}></Navbar>
                        </div>
                        <br />
                        <div className="d-flex justify-content-center">
                            <div className="card text-white bg-dark mb-3 col-sm-6">
                                <form className="mx-auto" onSubmit={onPublish}>
                                    <h3 style={{ textAlign: "center", fontFamily: "Brush Script MT,cursive" }}>Create blog!</h3>
                                    <div className="form-group">
                                        <label>Blog Title</label>
                                        <input type="text" className="form-control" placeholder="Enter Title" onChange={titleHandler} value = {Title} required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" rows="5" placeholder="Write your blog content here" onChange={descHandler} value = {Description} required></textarea>
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Upload image</label>
                                        <input name="input-b2" type="file" class="form-control" data-show-preview="false" required></input>
                                    </div> */}
                                    <br />
                                    <div className="pl-5 mb-2">
                                        <button className="btn btn-light" type="submit">Publish <i className="fa fa-plus" aria-hidden="true"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="container">
                            <div className = "row">
                            {Blogs && Blogs.map((blog) => {
                                return (
                                    <div className = "col-sm-6 col-md-4">
                                        <div className="card border-dark mb-3">
                                        <div className="card-header">Blog {i++}</div>
                                            <div className="card-body text-dark">
                                                <h5 className="card-title">{blog.title}</h5>
                                                <p className="card-text">{blog.description}</p>
                                                <small className = "card-footer text-muted">Created by : {blog.creator}</small>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}


