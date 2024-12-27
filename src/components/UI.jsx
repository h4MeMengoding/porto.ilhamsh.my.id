import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";

const pictures = [
  "porto2",
  "porto3",
  "porto4",
  "porto5",
  "porto6",
  "porto7",
  "porto8",
  "porto9",
  "porto10",
  "porto11",
  "porto12",
  "porto13",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "porto",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "porto14",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [isIndonesian, setIsIndonesian] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  function close() {
    if (isIndonesian) {
      setIsOpen(false);
    } else {
      setIsIndonesian(true);
    }
  }

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
        <div className="fixed inset-0 z-10 bg-black/80">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-bold text-white">
                {isIndonesian ? "Informasi" : "Information"}
              </DialogTitle>
              <p className="mt-2 text-base/6 text-white/50">
                {isIndonesian ? (
                  <>
                    Anda dapat mengubah posisi buku dengan:
                    <br />
                    <strong>[Desktop]</strong> Gunakan scroll wheel mouse untuk memperbesar dan memperkecil, gunakan klik kiri dan tahan untuk memutar buku, gunakan klik kanan dan tahan untuk menggeser posisi buku.
                    <br />
                    <strong>[Mobile]</strong> Gunakan dua jari untuk memperbesar atau memperkecil dengan gerakan membuka dan menutup atau geser untuk menggeser posisi buku, gunakan satu jari untuk memutar buku.
                  </>
                ) : (
                  <>
                    You can change the position of the book by:
                    <br />
                    <strong>[Desktop]</strong> Use mouse scroll wheel to zoom in and out of the book, use left click and hold to rotate the book, use right click and hold to shift the position of the book.
                    <br />
                    <strong>[Mobile]</strong> Use 2 fingers in an open and close manner to zoom in and out or slide to shift the position of the book, use 1 finger to rotate the book.
                  </>
                )}
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  {isIndonesian ? "Oke, mengerti!" : "Okay, got it!"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Main Content */}
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <a
          className="pointer-events-auto mt-10 ml-10"
          href="https://ilhamsh.my.id"
        >
          <img className="w-20" src="/images/hame-white.png" />
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0
                  ? "Cover"
                  : `Page ${index * 2 - 1} - ${index * 2}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
