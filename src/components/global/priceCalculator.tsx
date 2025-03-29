import { createSignal } from 'solid-js';

export default function Counter(props) {
    const [count, setCount] = createSignal(props.initialDays);

    const calculatePriceAndDiscount = (discountPercentage = 0.2) => {
        const basePrice = count() * props.dailyPrice;
        const discountedPrice = basePrice * (1 - discountPercentage);
        const roundedDiscountedPrice = Math.floor(discountedPrice);

        return { actualPrice: roundedDiscountedPrice, standardPrice: basePrice };
    };

    return (
        <div class="flex flex-col">
            <div class="flex items-center">
                <input
                    type="number"
                    id="dayNumber"
                    name="dayNumber"
                    class="w-1/4 p-2 border border-gray-900 bg-gray-900 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    min="1"
                    value={count()}
                    onInput={(e) => {
                        setCount(parseInt(e.target.value, 10));
                    }}
                />
                <div class="flex-1 flex justify-center">
                    <span class="ml-2 text-blue-900 font-bold text-2xl">
                        Prix:
                    </span>
                    <span class="ml-2 text-blue-900 font-bold text-2xl">
                        {count() !== 1 ? (
                            <>
                                <del>{calculatePriceAndDiscount().standardPrice}€</del> {calculatePriceAndDiscount().actualPrice}€
                            </>
                        ) : (
                            `${calculatePriceAndDiscount().standardPrice}€`
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}