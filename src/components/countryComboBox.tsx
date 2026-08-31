import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import countries from "@/data/countries.json";

interface CountryOption {
  name: string;
  alpha3: string;
}

export function CountryCombobox() {
  return (
    <Combobox
      items={countries}
      name="countryComboBox"
      itemToStringLabel={(country: CountryOption) => country.name}
      itemToStringValue={(country: CountryOption) => country.alpha3}
    >
      <ComboboxInput placeholder="Select a country" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(country) => (
            <ComboboxItem key={country.alpha3} value={country}>
              {country.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
