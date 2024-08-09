export default function BlogPostPage({ params }) {
    const { id } = params;
    return (
        <main>
            <h1>Blog post</h1>
            <p>{id}</p>
        </main>
    );
}
