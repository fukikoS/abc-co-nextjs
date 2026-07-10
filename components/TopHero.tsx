export default function TopHero() {
  return (
    <section className="hero relative text-center h-[calc(100vh-65px)] grid place-items-center overflow-hidden">
      <div className="hero__content relative z-10 -top-5">
        <h1 className="hero__title text-7xl sm:text-9xl font-bold"><span className="hero__title-text text-main-blue font-poppins">ABC Co</span><span className="hero__title-dot inline-block">.</span></h1>
        <p className="hero__subtitle text-2xl font-bold mt-5 md:hidden">あたらしい一歩を、<br />あなたといっしょに。</p>
        <p className="hero__subtitle text-2xl font-bold mt-5 hidden md:block">あたらしい一歩を、あなたといっしょに。</p>
      </div>
    </section>
  )
}