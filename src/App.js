// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
	const [amount, setAmount] = useState(1);
	const [currencyOne, setCurrencyOne] = useState("USD");
	const [currencyTwo, setCurrencyTwo] = useState("EUR");
	const [converted, setConverted] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			async function convert() {
				setIsLoading(true);
				const res = await fetch(
					`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyOne}&to=${currencyTwo}`
				);
				const data = await res.json();
				console.log(data);
				setConverted(data.rates[currencyTwo]);
				setIsLoading(false);
			}

			if (currencyOne === setCurrencyTwo) return setConverted(amount);
			convert();
		},
		[amount, currencyOne, currencyTwo]
	);

	return (
		<div>
			<form>
				<input
					type="text"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					placeholder="1"
					disabled={isLoading}
				/>
				<select
					value={currencyOne}
					onChange={(e) => setCurrencyOne(e.target.value)}
					disabled={isLoading}
				>
					<option value="USD" selected>
						USD
					</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
				<select
					value={currencyTwo}
					onChange={(e) => setCurrencyTwo(e.target.value)}
					disabled={isLoading}
				>
					<option value="USD">USD</option>
					<option value="EUR" selected>
						EUR
					</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
				<p>{`${amount} ${currencyOne} is equal to ${converted} ${currencyTwo}.`}</p>
			</form>
		</div>
	);
}
