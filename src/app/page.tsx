'use client';
import Home from "@/components/Home/Home";
import Footer from "@/components/Layouts/Footer";
import Layouts from "@/components/Layouts/Layouts";
import Navbar from "@/components/Layouts/Navbar";

export default function HomePage() {
    return (
        <Layouts
            navbar={<Navbar />}
            main={<Home />}
            footer={<Footer />}
        />
    )
}
