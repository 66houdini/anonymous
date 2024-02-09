import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
        <div className=" flex flex-col md:justify-center items-center p-5 bg-black text-white min-h-screen">
            <Link to={"/"} className=" text-xl md:text-3xl lg:text-6xl xl:text-8xl font-bold text-green-600">TRINITY ANONYMOUS</Link>
        <Outlet />
        </div>
        
        </>
    );
}