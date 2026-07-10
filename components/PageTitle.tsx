type Props = {
  en: string
  ja: string
}

export default function PageTitle({ en, ja }: Props) {
  return (
    <div className="page-title-block">
      {/* <span className="page-title-ghost" aria-hidden="true">{en}</span> */}
      <h1 className="page-title-en">{en}</h1>
      <span className="page-title-line" />
      <p className="page-title-ja">{ja}</p>
    </div>
  )
}
