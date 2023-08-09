import { useState, ChangeEvent } from "react";
const App = (): JSX.Element => {
const [term, setTerm] = useState<string>('');
const [options, setOptions] = useState<[]>([]);

const getSearchOption = async (value: string) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
  .then(res => res.json())
  .then(data => setOptions(data))
}

const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  setTerm(value);
  if (value === '') return;
  console.log(e.target.value)
  getSearchOption(value);
};

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-300 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg text-zinc-700">
      <h1 className="text-4xl font-thin">Weather <span className="font-black">Forecast</span></h1>
      <p className="text-sm mt-3">Enter below a place you want to know the weather of and
        select an option from the dropdown</p>
        <div className="flex mt-10 md:mt-4">
        <input type="text" value={term} onChange={onInputChange} className="px-2 py-1 rounded-l-md border-2 border-white text-black" />
        <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">search</button>
        </div>

        </section>
    </main>
  )
}

export default App
