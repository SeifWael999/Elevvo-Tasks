const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="card h-100 shadow-sm">
      <img src={post.image} className="card-img-top" alt={post.title} loading="lazy" />
      <div className="card-body">
        <span className="badge text-bg-primary mb-2">
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <p className="card-text"><small className="text-body-secondary">{formatDate(post.date)}</small></p>
      </div>
    </div>
  )
}

export default BlogCard
