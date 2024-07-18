import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Store } from './store';
import PlaceIcon from '@mui/icons-material/Place';
const MapComponent = dynamic(() => import('./map'), { ssr: false });

export default function StorePage() {
    return (
        <main className="">
           <title>Gong Cha Shawnessy - Store</title>

        <meta name="description" 
        content="Welcome to Gong Cha Shawnessy, find out where to find us and contact us." />

        <meta name="keywords" 
        content="bubble tea,boba, Gong Cha,Gong Cha Calgary,Gong Cha Shawnessy,
        Gong Cha Canada, menu, store locations, story, Location" />
        
            <Store/>


            
            

            <div className="w-3/4 mt-10 mb-5 flex flex-col items-center mx-auto ">
                <div className='text-black bg-gray-300 w-full  my-2 p-4 '>


                    <div className='flex space-x-5'>

                        <PlaceIcon/>
                        <div className='flex-col flex'>

                            <p className='font-medium text-gray-700'> 
                                Shawnessy
                            </p>

                            <p className='text-sm text-gray-500'>70 Shawville Blvd SE #228, Calgary, AB T2Y 2Z3</p>
                            <p className='text-sm text-gray-500'>{`(403) 453-4273`}</p>
                        </div>
                    </div>

                  

                    
                </div>
                

                <MapComponent />


            </div>
        </main>
    );
}
