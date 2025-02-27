export default function Timeline() {
  return (
    <aside id="timeline" className="w-full h-full">
      <div
        className="rounded-sm flex flex-col justify-between overflow-hidden text-white text-[10px] px-2"
        style={{
          height: "20%",
          backgroundColor: "red",
        }}
      >
        <span className="self-start bg-black bg-opacity-50 rounded px-1">
          00:00
        </span>
        <span className="self-end bg-black bg-opacity-50 rounded px-1">
          03:00
        </span>
      </div>

      <div
        className="rounded-sm flex flex-col justify-between overflow-hidden text-white text-[10px] px-2"
        style={{
          height: "80%",
          backgroundColor: "blue",
        }}
      >
        <span className="self-start bg-black bg-opacity-50 rounded px-1">
          03:00
        </span>
        <span className="self-end bg-black bg-opacity-50 rounded px-1">
          24:00
        </span>
      </div>
    </aside>
  );
}
