const groupBy = require('lodash/groupBy')
const mapValues = require('lodash/mapValues')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const groupedByAuthor = groupBy(blogs, 'author')
  const authorsWithBlogCount = mapValues(groupedByAuthor, (o) => { return o.length })

  let sortable = []

  for (let author in authorsWithBlogCount) {
    sortable.push([author, authorsWithBlogCount[author]])
  }

  const authorWithMostBlogsAndCount = sortable.sort((a,b) => { return b[1] - a[1] })[0]

  return { author: authorWithMostBlogsAndCount[0], blogs: authorWithMostBlogsAndCount[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const groupedByAuthor = groupBy(blogs, 'author')
  const authorsWithLikesCount = mapValues(groupedByAuthor, (o) => { return o.map(o => o.likes).reduce((sum, likes) => { return sum + likes }) })

  let sortable = []

  for (let author in authorsWithLikesCount) {
    sortable.push([author, authorsWithLikesCount[author]])
  }

  const authorWithMostLikesAndCount = sortable.sort((a,b) => { return b[1] - a[1] })[0]

  return { author: authorWithMostLikesAndCount[0], likes: authorWithMostLikesAndCount[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}