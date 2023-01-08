import React from "react";
import blogData from '../documents/blogs.json';
import Thumbnail from "../components/Thumbnail";


const Home = () => {
    const submitButton = false;
    const [articles, setArticles] = React.useState(null);

    React.useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/blogs/');
            const json = await response.json();

            if (response.ok) {
                setArticles(json);
            } else {
                console.log("failure");
            }
        };

        fetchArticles();
    }, []);

    const accessBlog = (id) => {
        const fetchBlog = async () => {
            const response = await fetch(`/blogs/${id}`);
            const json = await response.json();

            if (response.ok) {
                console.log(json);
            } else {
                console.log(`Failure to retrieve blog with id ${id}`);
            }
        }

        fetchBlog();
    }

    const submitPost = async (e) => {
        e.preventDefault();
        const data = blogData['Blogs'][0]
        console.log(data)
        const response = await fetch('/blogs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        } else {
            console.log("success")
        }
    }

    return (
        <div className="home">
            {articles && articles.map((x) => (
                <Thumbnail key={x._id} props={{...x, accessBlog: () => {accessBlog(x._id)}}}></Thumbnail>
            ))}
            {submitButton && <button onClick={submitPost}>SUBMIT</button>}
        </div>
    );
}


export default Home;