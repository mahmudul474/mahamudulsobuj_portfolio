 import { Header } from "@/components/header";

export default function Page() {
  const profile = {
    name: "Mahamudul Hasan",
    title: "Shopify Specialist & Ecommerce Developer",
    bio: "I build premium Shopify experiences focused on clean design, strong user experience, performance, and conversion.",
  };

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-40">
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
          About
        </p>

        {/* Name */}
        <h1
          className="
            mt-4

            font-display

            text-5xl
            font-bold

            tracking-tight

            text-white

            sm:text-6xl
          "
        >
          {profile.name}
        </h1>

        {/* Bio */}
        <p
          className="
            mt-8

            max-w-3xl

            text-lg

            leading-8

            text-zinc-400

            sm:text-xl
          "
        >
          {profile.bio}
        </p>

        {/* Title */}
        <p
          className="
            mt-8

            text-sm

            uppercase

            tracking-[0.2em]

            text-zinc-500
          "
        >
          {profile.title}
        </p>
      </main>
    </>
  );
}