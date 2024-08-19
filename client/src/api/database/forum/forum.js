import { fetch } from '../db-connection'

export const createPost = async ({ content, userId }) => {
  return await fetch
    .post('/forum/post/create', { content: content, userId: userId })
    .then(({ data }) => {
      return data.data
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

export const createComment = async (data) => {
  return await fetch
    .post('/forum/comment/v1/create', data)
    .then(({ data }) => {
      return data.data
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

export const createCommentInComment = async (data) => {
  return await fetch
    .post('/forum/comment/v2/create', data)
    .then(({ data }) => {
      return data.data
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

export const getPosts = async () => {
  return await fetch
    .get('/forum/posts')
    .then(({ data }) => {
      return data.data
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}
