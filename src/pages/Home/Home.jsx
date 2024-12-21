import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <NoteCard
          title="Meeting on 7th April"
          date="3rd April"
          content="Meeting on 7th April Meeting on 7th April"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        ></NoteCard>
      </div>
      <button className="w-16 h-16 btn flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>
    </>
  );
};

export default Home;
