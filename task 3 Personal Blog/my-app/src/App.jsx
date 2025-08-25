import { useState } from 'react'
import BlogCard from './components/BlogCard'
import FilterButton from './components/FilterButton'
import Pagination from './components/Pagination'
import { blogPosts } from './data/blogData'

function App() {
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6


  const getFilteredPosts = () => {
    if (currentCategory === 'all') {
      return blogPosts
    }
    return blogPosts.filter(post => post.category === currentCategory)
  }


  const getCurrentPagePosts = () => {
    const filteredPosts = getFilteredPosts()
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts.slice(startIndex, endIndex)
  }

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
    setCurrentPage(1)
  }


  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredPosts = getFilteredPosts()
  const currentPosts = getCurrentPagePosts()
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <div className="App">
      <header className="py-5 mb-4 bg-primary text-white text-center">
        <h1 className="display-5 fw-bold">My Personal Blog</h1>
      </header>

      <div className="container">
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          <FilterButton
            category="all"
            isActive={currentCategory === 'all'}
            onClick={handleCategoryChange}
          >
            All Posts
          </FilterButton>
          <FilterButton
            category="tech"
            isActive={currentCategory === 'tech'}
            onClick={handleCategoryChange}
          >
            Tech
          </FilterButton>
          <FilterButton
            category="travel"
            isActive={currentCategory === 'travel'}
            onClick={handleCategoryChange}
          >
            Travel
          </FilterButton>
          <FilterButton
            category="food"
            isActive={currentCategory === 'food'}
            onClick={handleCategoryChange}
          >
            Food
          </FilterButton>
        </div>

        {currentPosts.length === 0 ? (
          <div className="text-center py-5 text-muted">No posts found for this category.</div>
        ) : (
          <div className="row g-4 mb-4">
            {currentPosts.map(post => (
              <div key={post.id} className="col-12 col-sm-6 col-lg-4">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default App
