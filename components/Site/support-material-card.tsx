export default function SupportMaterialCard(
    { date, name, city, link, category },
) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center bg-white w-full rounded-[20px] px-10 py-7">
            <div className="flex flex-col gap-5 w-full">
                <span className="text-pink1 text-sm font-light">{date}</span>
                <span className="font-sora font-semibold text-lg text-gray10">
                    {name}
                </span>
                <div className="flex flex-col gap-11 lg:flex-row text-xs font-light text-black text-opacity-25">
                    <span>{category}</span>
                    <span>{city}</span>
                </div>
            </div>
            <a href={link} target="_blank" className="mt-5 lg:mt-0">
                <button className="flex justify-center items-center gap-2 bg-pink1 text-white rounded-full py-2 px-8">
                    <span>Baixar</span>

                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.5"
                            d="M14.417 18.6878H7.58366C7.35712 18.6878 7.13986 18.5978 6.97967 18.4376C6.81948 18.2775 6.72949 18.0602 6.72949 17.8337C6.72949 17.6071 6.81948 17.3899 6.97967 17.2297C7.13986 17.0695 7.35712 16.9795 7.58366 16.9795H14.417C14.6435 16.9795 14.8608 17.0695 15.021 17.2297C15.1812 17.3899 15.2712 17.6071 15.2712 17.8337C15.2712 18.0602 15.1812 18.2775 15.021 18.4376C14.8608 18.5978 14.6435 18.6878 14.417 18.6878Z"
                            fill="white"
                        />
                        <path
                            d="M14.5955 12.8877L11.6059 15.8773C11.5261 15.9565 11.4314 16.0191 11.3273 16.0616C11.2233 16.1041 11.1118 16.1256 10.9994 16.125C10.887 16.1256 10.7756 16.1041 10.6715 16.0616C10.5674 16.0191 10.4728 15.9565 10.393 15.8773L7.40339 12.8877C7.28486 12.7676 7.20458 12.6151 7.17265 12.4494C7.14073 12.2837 7.1586 12.1122 7.22401 11.9567C7.28809 11.8007 7.39691 11.6672 7.53675 11.5729C7.6766 11.4787 7.84121 11.4279 8.00984 11.4271H10.1453V4.16667C10.1453 3.94013 10.2353 3.72287 10.3954 3.56268C10.5556 3.40249 10.7729 3.3125 10.9994 3.3125C11.226 3.3125 11.4432 3.40249 11.6034 3.56268C11.7636 3.72287 11.8536 3.94013 11.8536 4.16667V11.4271H13.989C14.1591 11.4262 14.3256 11.4762 14.4671 11.5705C14.6086 11.6649 14.7188 11.7993 14.7834 11.9567C14.8477 12.113 14.8642 12.285 14.8308 12.4507C14.7973 12.6165 14.7154 12.7685 14.5955 12.8877Z"
                            fill="white"
                        />
                    </svg>

                    {
                        /*
                    <svg className="w-8 h-8">
                        <use href="/sprites.svg#DownloadIcon" />
                    </svg>*/
                    }
                </button>
            </a>
        </div>
    );
}
