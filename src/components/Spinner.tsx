import superManIcon from '@/assets/icons/superman.svg';

export const Spinner = () => (
  <div className="w-full flex justify-center py-4 absolute left-0 right-0 bottom-20">
    <div className="rounded-full h-20 w-20 bg-white p-4 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <img
        src={superManIcon}
        alt="Loading Heroes"
        title="Loading Heroes"
        className="animate-spin"
      />
    </div>
  </div>
);