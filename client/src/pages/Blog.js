import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <>
      <h1 className="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Articole recente
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            className="w-full"
            src="https://donaonline.ro/image/cache/img/jpg/catalog/blog/ce-este-anemia-min-1060x400w.webp"
            alt="Anemia"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              ANEMIA, AFECȚIUNE COMUNĂ, CU SIMPTOME DE OBOSEALĂ ȘI SLĂBICIUNE
              <br />
            </div>
            <p className="text-gray-700 text-base">
              Anemia este o problemă de sănătate care poate apărea la orice
              vârstă, dar afectează, cu predilecție, copiii și femeile
              însărcinate, dar și persoanele care au depășit vârsta de 65 de
              ani. Conform Organizației Mondiale a Sănătății, peste 40% dintre
              femeile însărcinate sunt afectate de această problemă, iar, în
              cazul copiilor cu vârsta mai mică de 5 ani, procentul este și mai
              ridicat...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="https://donaonline.ro/sanatate-dona/anemia-ce-este-cauze-tipuri-simptome-tratament">
              <button className="text-center justify-center mb-10 bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-black py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Citeste in continuare
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg ml-10 ">
          <img
            className="w-full"
            src="https://donaonline.ro/image/cache/img/jpg/catalog/blog/dermatita-seboreica-min-1060x400w.webp"
            alt="Dermatita"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              DERMATITA SEBOREICĂ: CE ESTE, DE CE APARE ȘI CUM O TRATĂM
              <br />
              <br />
            </div>
            <p className="text-gray-700 text-base">
              De multe ori, când auzim de dermatita seboreică, ne gândim că ea
              este responsabilă doar de apariția problemelor de la nivelul
              scalpului, de mătreață sau de scalpul iritat, însă lucrurile nu
              stau deloc așa. Dermatita seboreică poate apărea în orice zonă a
              corpului în care există o secreție abundentă de sebum, așa cum
              este cazul feței, pleoapelor, zona pieptului, dar și aceasta se
              poate întâlni în pliurile pielii...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="https://donaonline.ro/sanatate-dona/dermatita-seboreica-cauze-simptome-diagnostic-tratament">
              <button className="text-center justify-center mb-10 bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-black py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Citeste in continuare
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg ml-10 ">
          <img
            className="w-full"
            src="https://donaonline.ro/image/cache/img/jpg/catalog/blog/cauze-si-tratament-foliculita-min-1060x400w.webp"
            alt="Foliculita"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              FOLICULITA: CE ESTE, DE CE APARE ȘI CUM O TRATĂM
              <br />
              <br />
            </div>
            <p className="text-gray-700 text-base">
              Foliculita este una dintre cele mai întâlnite afecțiuni ale pielii
              și apare, de cele mai multe ori, ca urmare a unei infecții fungice
              sau bacteriene. În urma infecției, pe piele, apare o iritație sau
              un eritem, care pot fi însoțite, ocazional, de durere sau prurit.
              Foliculita este o afecțiune neplăcută, dar tratabilă, deși, în
              anumite cazuri, cum este cel al pacienților imunocompromiși, ...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="https://donaonline.ro/sanatate-dona/foliculita-inflamatia-firului-de-par-cauze-tratament">
              <button className="text-center justify-center mb-10 bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-black py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Citeste in continuare
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg ml-10 ">
          <img
            className="w-full"
            src="https://www.medichub.ro/image/12216/1070/720/475/ins-in-2019-in-romania-functionau-peste-63-000-de-unitati-sanitare-iar-in-sistemul-de-sanatate-lucrau-63-300-de-medici.jpg"
            alt="Unitati_medicale"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Sistemul medical din România în cifre
              <br />
              <br />
            </div>
            <p className="text-gray-700 text-base">
              Pe principalele categorii de unităţi, rețeaua sanitară a dispus,
              în anul 2022, de: 544 spitale, aproximativ 14 mii de cabinete
              medicale independente de specialitate, aproximativ 8 mii de
              farmacii, peste 16 mii de cabinete stomatologice independente, cu
              164 unități maimulte decât în anul precedent; peste 10 mii de
              cabinete de medicină de familie, în scădere cu 26 cabinete față de
              anul 2021...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/grafic">
              <button className="text-center justify-center mb-10 bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-black py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Vezi grafic
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
