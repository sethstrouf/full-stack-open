const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.map(blog => blog.likes).reduce((sum, likes) => {
      return sum + likes
    })
    : 0
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let favoriteBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  })

  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}