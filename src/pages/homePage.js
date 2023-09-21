import React, { useState, useEffect } from "react";
import image2 from "../assets/Poster (1).png";
import image3 from "../assets/Poster Image (1).png";
import image4 from "../assets/Poster Image (2).png";
import image5 from "../assets/Poster Image (3).png";
import image6 from "../assets/Poster Image (4).png";
import image7 from "../assets/Poster Image (5).png";
import image8 from "../assets/Poster Image.png";
import image9 from "../assets/Poster.png";
import image10 from "../assets/download (2).jpeg";
import image11 from "../assets/download.jpeg";
import image12 from "../assets/download (1).jpeg";
import image13 from "../assets/images (1).jpeg";
import image14 from "../assets/images.jpeg";
import search from "../assets/Search.svg";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const HomePage = () => {
  const imageArray = [
    { img: image2, name: "Spiderman", id: 1 },
    { img: image3, name: "Dunkirk", id: 2 },
    { img: image4, name: "Dune", id: 3 },
    { img: image5, name: "No Time To Die", id: 4 },
    { img: image6, name: "Shang-chi", id: 5 },
    { img: image7, name: "Don't Breathe", id: 6 },
    { img: image8, name: "Batman Begins", id: 7 },
    { img: image9, name: "Stranger Things", id: 8 },
    { img: image10, name: "65", id: 9 },
    { img: image11, name: "Alien", id: 10 },
    { img: image12, name: "Miirstey", id: 11 },
    { img: image13, name: "Titanic", id: 12 },
    { img: image14, name: "Starwars", id: 13 },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
      } else {
        // console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [imagelist, setImageList] = useState(imageArray);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImageList = [...imagelist];
    const [reorderedItem] = updatedImageList.splice(result.source.index, 1);
    updatedImageList.splice(result.destination.index, 0, reorderedItem);
    setImageList(updatedImageList);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredItems = imageArray.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
      // item.img
    );

    setResults(filteredItems);
  };

  return (
    <div className="p-2 sm:p-5 py-10 flex flex-col gap-6 items-center">
      <div className="flex justify-end w-full">
        <button
          onClick={handleLogout}
          className="text-xs text-white bg-[#ff3939] w-28 h-[38px] flex justify-center items-center font-bold rounded-[8px]"
        >
          LOG OUT
        </button>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="flex border border-[#D1D5DB] rounded-[6px] h-[36px] w-[96%] sm:w-[80%]">
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-[10px] text-sm bg-transparent outline-none"
            placeholder="What do you want to watch"
            onFocus={() => {
              navigate("/Search");
            }}
          />
          <div
            onClick={handleSearch}
            className="w-8 bg-slate-800 flex rounded-r-[6px] justify-center cursor-pointer items-center"
          >
            <img className="h-[16px] w-[16px]" src={search} alt="" />
          </div>
        </div>

        {results.length > 0 && (
          <ul>
            <div className="flex justify-end">x</div>
            {results.map((result) => (
              <li key={result.id}>
                <img src={result.img} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 xs:gap-5 xl:grid-cols-4 gap-y-8 justify-items-center"
            >
              {imagelist.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative shadow shadow-[#000]"
                    >
                      <img className=" h-[270px] xs:h-[360px]" src={item.img} />
                      <div className="absolute bottom-3 bg-[#000000ad] text-white py-1 flex justify-center w-full">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
