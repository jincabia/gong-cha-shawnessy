import { useRouter } from "next/navigation"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCart';
import { grey, red } from "@mui/material/colors";


export const EmptyCart = () =>
{
    const router = useRouter();
    return(
        <main className="text-center w-fit my-10 mx-auto space-y-3">

            <ShoppingCartOutlinedIcon fontSize="large" className="hover:bg-stone-200 rounded-md " sx={{ color: grey[900] }}/>


            <h1 className="font-semibold">Add drinks to your cart.</h1>
            <p className="w-fit">Once you add items, it will appear here.</p>

            <button className=" bg-red-800 rounded-md py-2 px-4 text-white shadow-md" 
            onClick={()=> router.push('/menu')}>Browse the menu</button>
        </main>
    )
}