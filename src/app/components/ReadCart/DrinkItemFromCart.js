

export default function DrinkItemFromCart({drinkName, ice, price, size, sugar, toppings})
{

    return(
        <div>
            <h1>{drinkName}</h1>
            <h1>{ice}</h1>
            <h1>{price}</h1>
            <h1>{size}</h1>
            <h1>{sugar}</h1>
            <div>
                <h2>Toppings:</h2>
                {toppings.map((topping, index) => (
                <div key={index}>
                    <h3>{topping.product_name}</h3>
                    <p>Price: ${topping.product_price}</p>
                </div>
                ))}
            </div>

        </div>
    )
}