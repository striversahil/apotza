import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/command";
import { PopoverContent } from "@repo/ui/popover";
import React from "react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopoverContext = (props: Props) => {
  const randomArray = ["one", "two", "three"];

  return (
    <PopoverContent side="top">
      <Command>
        {/* <CommandInput placeholder="Search..." /> */}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {randomArray.map((item) => {
              return (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    props.setIsOpen(false);
                    console.log(item);
                  }}
                >
                  {item}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
};

export default PopoverContext;
