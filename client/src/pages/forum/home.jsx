import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost, getPosts } from '../../api/database/forum/forum'
import { Post } from '../../components/posts/post/Post'
import { useUserContext } from '../../hook/useUserContext'
import { PostSkeleton } from '../../components/posts/skeleton/Skeleton'

export function ForumHome() {
  const { user } = useUserContext()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const redirect = useNavigate()

  useEffect(() => {
    if (!user) {
      redirect('/')
    }
    getData()

    setInterval(async () => {
      setPosts(await getPosts())
    }, 60000)
  }, [])

  const getData = async () => {
    setPosts(await getPosts())
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    formData.append('userId', user.id)

    const data = {
      userId: user.id,
      content: formData.get('content'),
    }

    document.getElementById('postForm').reset()
    createPost(data)
  }
  return (
    <>
      <header className="mx-auto max-w-3xl p-4">
        <form
          className="grid w-full gap-2 rounded-md bg-[#282828] p-4"
          id="postForm"
          onSubmit={handleSubmit}
        >
          <p className="text-lg">
            ¡Comparte lo que estás pensando con el resto del servidor!
          </p>
          <textarea
            name="content"
            className="min-h-[100px] w-full rounded-md px-1 py-2 outline-none"
            placeholder="¿En qué estás pensando?"
          ></textarea>
          <button className="max-w-[80px] rounded-md border py-1 font-bold transition-colors hover:border-orange-500 hover:bg-orange-500">
            Publicar
          </button>
        </form>
      </header>

      <section className="mx-auto my-10 flex min-h-full max-w-3xl flex-col-reverse gap-4 rounded-md p-4">
        {loading && <PostSkeleton />}
        {posts?.map((post) => {
          return (
            <Post
              key={post.id}
              content={post.content}
              owner={post.username}
              avatar={post.avatar}
              comments={[
                {
                  avatar: null,
                  owner: 'Santiago',
                  content: 'Este es un comentario fijado',
                },
                {
                  avatar: null,
                  owner: 'Santiago',
                  content: 'Este es un comentario fijado',
                },
              ]}
            />
          )
        })}
        {!posts && (
          <p className="text-center text-2xl font-bold">
            ¡Aún no hay publicaciones, se el primero!
          </p>
        )}
      </section>
    </>
  )
}
