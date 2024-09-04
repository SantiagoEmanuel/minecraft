import { useUserContext } from '../../../hook/useUserContext'
import { Comments } from '../icons/Comments'
import { Like } from '../icons/Like'
import { PostIcon } from '../icons/Post'

export function Post({
  content = 'Hola como estas, este es el servidor de Minecraft, espero sea de tu agrado, se trata de tener la experiencia más vanilla posible.',
  owner = 'unknown',
  avatar = null,
  comments = null,
}) {
  const { user } = useUserContext()
  return (
    <article className="mx-auto flex min-h-[190px] w-full max-w-3xl flex-col justify-between gap-4 rounded-md bg-[#282828] p-2">
      <header className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-1">
            <img
              src={avatar ? avatar : '/icon/user-image.png'}
              alt="Avatar del usuario"
              className="h-full w-full max-w-[24px]"
              style={{
                rotate: 'y 180deg',
              }}
            />
            <p className="text-center">{owner}</p>
          </div>
          <img
            src="/favicon.ico"
            alt="Logo del sitio web"
            className="max-w-[32px]"
          />
        </div>
      </header>
      <div className="rounded-md border p-2">
        <p>{content}</p>
      </div>
      <footer className="flex items-center justify-end gap-2">
        <button>
          <Comments />
        </button>
        <button>
          <Like />
        </button>
        <button>
          <PostIcon />
        </button>
      </footer>
      {comments && (
        <section className="grid gap-4 rounded-md border p-2">
          <h4>Comments</h4>
          {comments.map((comment) => (
            <div className="grid gap-2">
              <header className="flex h-full w-full gap-1">
                <img
                  src={comment.avatar ? comment.avatar : '/icon/user-image.png'}
                  alt="Avatar del usuario"
                  className="h-full w-full max-w-[24px]"
                  style={{
                    rotate: 'y 180deg',
                  }}
                />
                <p className="text-center">{comment.owner}</p>
              </header>
              <div className="rounded-md border p-2">
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </article>
  )
}
