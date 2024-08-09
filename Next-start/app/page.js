import Link from "next/link";
import Header from "@/components/Header";
export default function Home() {
    return (
        <main>
            <Header />
            <img src="/logo.png" alt="A server surrounded by magic sparkles." />
            <h1>Welcome to this NextJS Course!</h1>
            <p>🔥 Let&apos;s get started! 🔥</p>
            <Link href="/about">about</Link>
        </main>
    );
}
