import { getPosition } from "@/utils/scoreUtils";
import { Image } from "@chakra-ui/react";

function transformArray(inputArray) {
  // Group objects by the 'hole' property
  const groupedByHole = inputArray.reduce((acc, item) => {
    if (!acc[item.hole]) {
      acc[item.hole] = [];
    }
    acc[item.hole].push(item);
    return acc;
  }, {});

  // Transform the grouped objects into the desired array structure
  const transformedArray = Object.keys(groupedByHole).map((hole) => ({
    hole: hole,
    list: groupedByHole[hole],
  }));

  return transformedArray;
}

export default function OyesList({ oyesList }) {
  const oyes = transformArray(oyesList);
  return (
    <div className="w-full max-w-2xl" aria-label="Directory">
      {oyes.map((oyesRow, i) => (
        <div key={i} className="relative ">
          <div className="flex justify-center sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-white px-3 py-1.5 text-md font-semibold leading-6 text-oneunder-700">
            <h3>Oyes for hole {oyesRow.hole}</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {oyesRow.list
              .sort((a, b) => a.distance - b.distance)
              .map((oyes, i) => (
                <li
                  key={i}
                  className="flex gap-x-4 px-3 py-5 items-center justify-between"
                >
                  <div className="flex gap-x-4 px-3 py-5">
                    <Image
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={`https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${oyes.player?.ghin}.png`}
                      fallbackSrc="https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/undefined.png"
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {oyes.player?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {oyes.distance} cm
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 truncate text-xl leading-5 text-gray-500">
                    {getPosition(i + 1)}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
