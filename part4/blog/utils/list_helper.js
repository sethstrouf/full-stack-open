const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.map(blog => blog.likes).reduce((sum, likes) => {
      return sum + likes
    })
    : 0
}

module.exports = {
  dummy,
  totalLikes
}