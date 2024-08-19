export function PostSkeleton() {
  return (
    <article className="mx-auto flex min-h-[190px] w-full max-w-3xl animate-pulse flex-col justify-between gap-4 rounded-md bg-[#282828] p-2">
      <header className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <div className="h-[24px] w-[24px] rounded-md bg-stone-700"></div>
            <p className="text-center"></p>
          </div>
          <div className="h-[24px] w-[24px] rounded-md bg-stone-700"></div>
        </div>
      </header>
      <div className="min-h-[100px] rounded-md bg-stone-700 p-2">
        <p></p>
      </div>
      <footer className="flex items-center justify-end gap-2">
        <button>
          <div className="h-[24px] w-[24px] rounded-md bg-stone-700"></div>
        </button>
        <button>
          <div className="h-[24px] w-[24px] rounded-md bg-stone-700"></div>
        </button>
        <button>
          <div className="h-[24px] w-[24px] rounded-md bg-stone-700"></div>
        </button>
      </footer>
    </article>
  )
}
