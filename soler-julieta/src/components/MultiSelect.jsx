export default function MultiSelect({ options, register, name, error, defaultValue = [] })
{
    return(
        <div className="w-full">
            <label>Skills</label>
            <select
                multiple
                {...register(name)}
                defaultValue={defaultValue}
                className={`w-full p-2 border rounded-lg appearance-none overflow-y-auto `}
            >
                {options.map((option, idx) => (
                    <option key={option._id ?? idx} value={JSON.stringify({ es: option.es, en: option.en })} className={`p-2 cursor-pointer hover:bg-mainViolet hover:text-white checked:bg-mainViolet checked:text-white`}>{option.es} / {option.en}</option>
                ))}
            </select>
        </div>
    )
}