import Papa from "papaparse";

// Define a type for the player data for TypeScript
interface PlayerData {
  Name: string;
  Nickname: string;
  "HCP Index": string;
  GHIN: string;
  Club: string;
  Category: string;
  Email: string;
  Phone: string;
}

// Validate a single player row
const validatePlayerRow = (row: PlayerData): boolean => {
  // Define the valid categories
  const validCategories = [
    "Campeonato",
    "AA",
    "A",
    "B",
    "C",
    "D",
    "E",

    "damas",
    "Senior",
    "SuperSenior",
    "Scratch",
    "Damas2da",
    "Damas1ra",
    "DamasA",
    "DamasB",
    "DamasC",
    "D-E",
  ];

  // Validate email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validate phone number (basic validation, can be adjusted as needed)
  const phonePattern = /^[0-9]+$/;

  // Perform the row validations
  return (
    typeof row.Name === "string" &&
    typeof row.Nickname === "string" &&
    !isNaN(Number(row["HCP Index"])) && // HCP Index should be a convertible number
    (/^[0-9]+$/.test(row.GHIN) || row.GHIN == "") && // GHIN should be numeric without decimals
    typeof row.Club === "string" &&
    validCategories.includes(row.Category) && // Category should be one of the valid options
    emailPattern.test(row.Email) && // Email should match the pattern
    phonePattern.test(row.Phone) // Phone should be numeric
  );
};

export const importPlayers = (
  event: React.ChangeEvent<HTMLInputElement>,
  onDataValidated: (data: PlayerData[]) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    Papa.parse(file, {
      complete: (result) => {
        const headers = result.meta.fields as string[];
        const requiredHeaders = [
          "Name",
          "Nickname",
          "HCP Index",
          "GHIN",
          "Club",
          "Category",
          "Email",
          "Phone",
        ];
        if (!requiredHeaders.every((header) => headers.includes(header))) {
          alert("The CSV file has incorrect headers");
          return;
        }

        const validRows: PlayerData[] = [];
        for (const row of result.data as PlayerData[]) {
          if (!validatePlayerRow(row)) {
            console.log(row);
            alert(
              "The CSV file provided has incorrect data, check the document's fields"
            );
            return; // Stop processing further if any row fails validation
          }
          validRows.push(row);
        }

        // Call the callback function with the validated data
        onDataValidated(validRows);
      },
      header: true,
      skipEmptyLines: true,
    });
  }
};
