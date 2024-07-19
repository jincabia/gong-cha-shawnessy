import DrinksList from "../components/drinks/drinksList";
import Image from "next/image";
import SignUpDialog from "../components/popup/signinpopup";
import NewAdditions from "./NewAdditions";

export default function Menu() {



  
  return (
    <main className="flex-grow">
      <title>Gong Cha Shawnessy - Menu</title>

      <meta name="description" 
      content="Welcome to Gong Cha Shawnessy, browse our menu and choose your customize your favorite drinks." />

      <meta name="keywords" 
      content="bubble tea,boba, Gong Cha,Gong Cha Calgary,Gong Cha Shawnessy,
      Gong Cha Canada, menu, store locations, story, Location, browse menu, drinks, favorite drinks, Alberta, Canada, Alberta Calgary" />

      <NewAdditions/>
      <DrinksList/>

    </main>
  );
}
