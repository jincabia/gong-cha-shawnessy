'use client';


import { useRouter } from 'next/navigation';

const EditCartModal = ({ onClose, loading, setLoading }) => {
  const router = useRouter();

  const handleContinueBrowsing = () => {
    router.push('/menu'); // Update with your actual menu path
  };

  const handleViewCart = () => {
    router.push('/cart'); // Update with your actual cart path
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-500 ease-in-out max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center justify-center space-y-4">
          {loading ? (
            <>
              <div className="spinner"></div>
              <span className="text-slate-500 font-semibold">Editing drink...</span>
            </>
          ) : (
            <>
              <svg className="h-8 w-8 text-green-500 border-2 border-green-500 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-black font-semibold">Changes applied</span>
              <div className="flex flex-col space-y-4 w-full">
                    <button
                    onClick={handleContinueBrowsing}
                    className="bg-red-700 text-white px-4 py-2 w-full rounded-md shadow hover:bg-red-400"
                    >
                    Continue Browsing
                    </button>
                    <button
                    onClick={handleViewCart}
                    className="bg-red-700 text-white px-4 py-2 w-full rounded-md shadow"
                    >
                    View Cart
                    </button>
               </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default EditCartModal