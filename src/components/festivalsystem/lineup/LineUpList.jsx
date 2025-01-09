"use client";
import { useState, useEffect, useRef } from "react";
import LineUpCard from "@/components/festivalsystem/lineup/LineUpCard";
import Headline from "@/components/global/Headline";
import LineUpRune from "@/img/svg/lineup_rune.svg";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const LineUpList = ({ mergedData }) => {
  //statevariabel med væriden mergedData (fra props) - setBands bruges til at opdatere state
  const [bands, setBands] = useState(mergedData);
  const [searchBand, setSearchBand] = useState(""); // Søgetekst
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedBand, setSelectedBand] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sectionRefs = useRef({}); //objekt til at remme refs

  const scrollToSection = (letter) => {
    sectionRefs.current[letter].scrollIntoView({ behavior: "smooth" });
    setSelectedLetter(letter);
  };

  useEffect(() => {
    const filteredBands = mergedData.sort().filter((band) => band.name.toLowerCase().includes(searchBand.toLowerCase())); // Filtrering
    setBands(filteredBands);
  }, [searchBand, mergedData]);

  //gruppér bands ved første bogstav i navn
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
  //https://www.youtube.com/watch?v=NbTs1Fd4iv4&t=1s
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
  const groupedBands = Object.groupBy(bands, (band) => band.name.charAt(0).toUpperCase());

  const openModal = (band) => {
    setSelectedBand(band);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBand(null);
  };

  return (
    <section className="max-w-screen-xl mx-auto px-2 py-[5vh] ">
      <div className="max-w-screen-xl mx-auto mb-3 pl-4">
        <Headline src={LineUpRune} text="2025 LINEUP" size="text-5xl md:text-6xl" width={45} height={45} />
      </div>
      <div className="grid py-6 md:pb-10">
        <form className="md:w-[30rem] md:justify-self-center">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-white border border-solid border-customOrange rounded-sm bg-customBlack focus:ring-customOrange focus:border-customOrange" placeholder="Søg efter bandnavn..." value={searchBand} onChange={(e) => setSearchBand(e.target.value)} />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-[auto_auto] md:grid-rows-[auto_auto] md:grid-cols-1">
        <div>
          {Object.keys(groupedBands)
            .sort()
            .map((letter) => (
              // https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
              <div key={letter} ref={(element) => (sectionRefs.current[letter] = element)}>
                <h2 className="p-4 lg:px-0 font-bold text-2xl md:text-3xl text-customOrange">{letter}</h2>
                <ul className="flex flex-wrap gap-8 justify-center lg:justify-start items-center pb-8">
                  {groupedBands[letter].map((band) => (
                    <li className="pb-8" key={`${letter}-${band.slug}`} onClick={() => openModal(band)}>
                      <LineUpCard key={band.slug} members={band.members} bio={band.bio} slug={band.slug} logo={band.logo} name={band.name} day={band.day} start={band.eventInfo.start} end={band.eventInfo.end} scene={band.scene} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className="sticky self-start top-[5rem] right-2 flex flex-col  md:row-start-1 md:flex-row md:justify-self-center md:gap-2 md:text-xl md:pb-10 md:static">
          {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys */}
          {Object.keys(groupedBands)
            .sort()
            .map((letter) => (
              <button
                aria-label={letter}
                onClick={() => scrollToSection(letter)}
                key={letter}
                style={{
                  color: selectedLetter === letter ? "#ec4d08" : "white",
                }}
              >
                {letter}
              </button>
            ))}
        </div>
      </div>

      {/* Modal Overlay og Modal */}
      {modalVisible && selectedBand && (
        <>
          {/* Overlay - baggrund som dækker skærmen */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>

          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center overflow-y-auto mx-4">
            <div className="bg-customBlack max-w-lg w-full rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
              <div className="relative">
                <button className="absolute top-1 right-1 m-2" alt="exit modal" onClick={closeModal}>
                  <RxCross2 className="bg-customBlack_5 text-customOrange h-10 w-10 md:ml-0 md:mb-8 border-solid border-[1px] border-customOrange rounded-full p-2" />
                </button>
                <Image width={100} height={100} src={selectedBand.logo.startsWith("http") ? selectedBand.logo : `https://spring-awesome-stream.glitch.me/logos/${selectedBand.logo}`} alt={`${selectedBand.name} logo`} className="w-full h-auto object-contain mx-auto" />{" "}
              </div>
              <div className="p-4">
                <h2 className="text-2xl pb-4 font-bold bg-gradient-to-bl from-customPink to-customOrange bg-clip-text text-transparent">{selectedBand.name}</h2>
                <div className="flex gap-2">
                  <h3 className="font-bold">Spiller:</h3>
                  <p> {selectedBand.day}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-bold">Scene:</h3>
                  <p>{selectedBand.scene}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-bold">Tidspunkt:</h3>
                  <p>
                    {selectedBand.eventInfo.start} - {selectedBand.eventInfo.end}
                  </p>
                </div>

                {/* Wrapper til bio */}
                <div className="mt-4">
                  <h3 className="font-bold">Om bandet:</h3>
                  <p className="text-white">{selectedBand.bio}</p>
                </div>

                <button aria-label="close modal" onClick={closeModal} className="mt-4 bg-customOrange text-white py-2 px-4 ">
                  Luk
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default LineUpList;
