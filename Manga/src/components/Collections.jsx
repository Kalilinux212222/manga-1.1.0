import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Use FaArrowLeft and FaArrowRight
import { Link } from 'react-router-dom'; // Import Link
import allMangaDb from '../MangaDB/allManga' // Import the manga data
import '../index.css';
import { FaFire } from "react-icons/fa";
import { FiRewind } from "react-icons/fi";
import OnePiece from '../images/download.jpeg';
import N2 from '../images/n2.jpeg';
import N3 from '../images/n3.jpeg';
import N48 from '../images/n48.jpeg';
import N4 from '../images/n4.webp';
import N32 from '../images/n32.jpg';
import N7 from '../images/n7.jpg';
import Naruto from '../images/images.jpeg';
import { MdRecommend } from "react-icons/md";
// Sample data for popular and latest items
const popularItems = [
        { image: N2, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N3, title: "Saruto", stars: [1, 2, 3, 4] },
        { image: N32, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N4, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N7, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N48, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N48, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N2, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N48, title: "Naruto", stars: [1, 2, 3, 4] },
        { image: N48, title: "Naruto", stars: [1, 2, 3, 4] },
    ];

    const latestItems = [
        { image: OnePiece, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        { image: Naruto, title: "One Piece", stars: [1, 2, 3, 4] },
        // Add more items as needed
    ];

const Card = ({ image, title, stars }) => (
    <div className="sm:w-[200px] sm:h-[330px] lg:w-[200px] lg:h-[330px] rounded-xl bg-white drop-shadow-lg m-3 mx-2 font-bold text-center text-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <img className="drop-shadow-lg mx-auto mt-2 w-[90%] max-h-[90%]" src={image} alt={title} />
        <p className="flex items-center justify-center mt-2 pt-1 text-sm">
            {title} 
        </p>
    </div>
);

const Col = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState(allMangaDb);
    const [more, setMore] = useState(false);
    const [moreOne, setMoreOne] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Filter the manga data based on the search input
        const results = allMangaDb.filter(item =>
            item.searchKey.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredResults(results);
    };

    const handleMoreToggle = () => {
        setMore(!more);
    };

    const handleMoreOneToggle = () => {
        setMoreOne(!moreOne);
    };

    return (
        <>
            <header className="text-black flex w-full items-center justify-between text-center mx-auto bg-gray-200">
                <div onClick={handleNav} className="p-4 block md:hidden">
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <nav className="mx-4 max-w-[400px] h-full overflow-x-scroll ">
                    <ul className="p-4 mx-auto hidden md:flex ">
                        <li className="p-4"><Link to="/">Home</Link></li>
                        <li className="p-4">News</li>
                        <li className="p-4"><Link to="/col">Collections</Link></li>
                        <li className="p-4">
                            <Link to="/RegistrationForm">Register</Link> {/* Link to Login */}
                        </li>
                        <li className="p-4">Resources</li>
                        <li className="p-4">Payment</li>
                        <li className="p-4"><Link to="/popular">Popular</Link></li>
                        <li className="p-4">Favourites</li>
                    </ul>
                </nav>
                <h2 className="flex md:text-3xl text-3xl font-bold p-4 mx-auto ">Mobibeezz</h2>
                <div className="hidden md:flex text-black items-center ">
                    <input
                        onChange={handleSearch}
                        value={search}
                        className="border-2 rounded-2xl p-1 mx-1"
                        placeholder="Search"
                        type="text"
                    />
                    <FaSearch className="drop-shadow-lg" size={20} />
                </div>
                {/* Mobile Navigation */}
                {nav && (
                    <div className="text-white fixed z-1 w-sm h-full right-0 top-0 border-r border-r-gray-900 bg-gray-700 ease-in-out duration-1000 lg:hidden ">
                        <nav>
                            <h2 className="text-white font-bold text-3xl p-4 border-b">Mobibeezz</h2>
                            <ul className="mx-auto pt-4">
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"><Link to="/">Home</Link></li>
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">News</li>
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"><Link to="/col">Collections</Link></li>
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">
                                    <Link to="/RegistrationForm">Register</Link> {/* Link to Login */}
                                </li>
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Payment</li>
                                <li className="my-1 p-4 rounded-2xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"><Link to="/popular">Popular</Link></li>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>
            <section className="w-full h-auto">
                <div className="flex w-full h-[100%] items-center justify-center mx-auto p-4">
                    <ul className="flex mx-4 font-bold border-b">
                        <li className="p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/popular">Popular</Link></li>
                        <li className="p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/newest">Newest</Link></li>
                        <li className="bg-sky-300 p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/col">Collections</Link></li>
                    </ul>
                </div>
            </section>
            <div className="flex overflow-x-auto ">
            
            {filteredResults.length > 0 ? (
                <div className="flex  justify-center mx-auto w-auto items-center text-center">
                    {filteredResults.map(item => (
                            <div className="flex mx-auto  flex-wrap drop-shadow-2xl m-4 justify-center ease-in-out duration-300">                                
                                <Card image={item.image} title={item.title} />
                            </div>
                    ))}
                </div>
            ) : (
                
                    <p className="flex font-bold text-2xl justify-center p-4">No results found</p>
                
            )}
        </div>

            {/* Popular Section */}
            <div>
                <h2 className="flex items-center font-bold text-2xl p-4">Recommended For You - <MdRecommend className="mx-2" size={30} color="black" /></h2>
            </div>
            <div className="flex mx-auto flex-wrap drop-shadow-2xl m-4 justify-center ease-in-out duration-300">
                {popularItems.slice(0, !more ? popularItems.length : 6).map((item, index) => (
                    <Card key={index} image={item.image} title={item.title} stars={item.stars} />
                ))}
            </div>

            <div className="flex justify-center">
                <button onClick={handleMoreToggle} className="flex items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                    <FaArrowLeft className="mx-2" size={20} /> Less
                </button>
                <button onClick={handleMoreToggle} className="flex mx-4 items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                    More <FaArrowRight className="mx-2" size={20} />
                </button>
            </div>

            {/* Latest Section */}
            <section className="w-full h-full mt-3 bg-gray-200">
                <div>
                    <h2 className="flex items-center font-bold text-2xl p-4">Newest - <FaFire  className="mx-2" size={20} color="black" /></h2>
                </div>
                <div className="flex mx-auto overflow-x-auto flex-wrap drop-shadow-2xl m-4 justify-center ease-in-out duration-300">
                    {latestItems.slice(0, !moreOne ? latestItems.length : 6).map((item, index) => (
                        <Card key={index} image={item.image} title={item.title} stars={item.stars} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <button onClick={handleMoreOneToggle} className="flex items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                        <FaArrowLeft className="mx-2" size={20} /> Less
                    </button>
                    <button onClick={handleMoreOneToggle} className="flex mx-4 items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                        More <FaArrowRight className="mx-2" size={20} />
                    </button>
                </div>
            </section>
        </>
    );
};

export default Col;