import { useEffect, useState, useMemo } from "react";
import SelectOption from "../../components/shared/select-option";
import { useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { useDuelData } from "../../context/duel-data-provider/useDuel";

interface Props {
  selectedIndex: number;
}

interface InventaryProps {
  name: string;
  useOptions?: {
    world?: {
      name: string;
      action: () => void;
    }[];
    duel?: {
      name: string;
      action: () => void;
    }[];
  };
  options: {
    name: string;
    action: () => void;
    quantity?: number;
  }[];
}

const OptionsInventary = ({ selectedIndex }: Props) => {
  const { setSequence, setUsedItem } = useDuelData();
  const { isOpen, onToggle } = useToggle();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectIndexElement, setSelectIndexElement] = useState(0);
  const [selectIndexUse, setSelectIndexUse] = useState(0);
  const { someProp }: { someProp?: "world" | "duel" } = location.state || {};
  console.log(someProp)
  const InventaryList = useMemo<InventaryProps[]>(
    () => [
      {
        name: "items",
        options: [
          {
            name: "CLOSE BAG",
            action: () => navigate(`/${someProp}`),
          },
        ],
      },
      {
        name: "POKé BALLS",
        useOptions: {
          world: [
            {
              name: "GIVE",
              action: () => navigate("/pokemon"),
            },
            {
              name: "CANCEL",
              action: () => onToggle(),
            },
          ],
          duel: [
            {
              name: "USE",
              action: () => {
                setSequence("throw-pokeball");
                navigate(`/${someProp}`);
              },
            },
            {
              name: "LEAVE",
              action: () => onToggle(),
            },
          ],
        },
        options: [
          {
            name: "POKé BALL",
            quantity: 50,
            action: () => onToggle(),
          },
          {
            name: "ULTRA BALL",
            quantity: 50,
            action: () => onToggle(),
          },
          {
            name: "CLOSE BAG",
            action: () => navigate(`/${someProp}`),
          },
        ],
      },
    ],
    [navigate, someProp, onToggle, setSequence]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === "z") {
        const selectedOption =
          InventaryList[selectedIndex]?.options?.[selectIndexElement];
        if (isOpen) {
          const currentInventory = InventaryList?.[selectedIndex];
          if (someProp) {
            const currentUseOptions = currentInventory?.useOptions?.[someProp];
            const selectedUseOption = currentUseOptions?.[selectIndexUse];
            setSelectIndexUse(0);
            setUsedItem(selectedOption.name);
            selectedUseOption?.action();
          }
        } else {
          if (selectedOption?.action) {
            selectedOption.action();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    selectIndexUse,
    InventaryList,
    selectedIndex,
    selectIndexElement,
    someProp,
    setUsedItem,
  ]);

  return (
    <div className="flex justify-between w-[375px] h-[390px] absolute top-[50px] left-[350px]">
      <SelectOption
        options={InventaryList?.[selectedIndex]?.options?.map(
          (opt) => opt?.name
        )}
        selectOpt={selectIndexElement}
        setSelectOpt={setSelectIndexElement}
        classNameOptions="h-full pr-0 bg-[#f8f8c8]"
        className="p-0 border-none"
        active={!isOpen}
      />
      {InventaryList?.[selectedIndex]?.options && (
        <div className="h-full font-normal text-3xl py-3 flex flex-col">
          {InventaryList?.[selectedIndex]?.options?.map((opt, i) => {
            if (opt.quantity) {
              return (
                <div key={i}>
                  <span className="align-middle text-4xl font-extralight">
                    ×
                  </span>
                  {opt.quantity}
                  {isOpen && selectIndexElement === i && someProp && (
                    <SelectOption
                      className="absolute right-[-5%] bottom-[-12%]"
                      options={
                        InventaryList?.[selectedIndex]?.useOptions?.[
                          someProp
                        ]?.map((useOpt) => useOpt.name) ?? []
                      }
                      selectOpt={selectIndexUse}
                      setSelectOpt={setSelectIndexUse}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default OptionsInventary;
