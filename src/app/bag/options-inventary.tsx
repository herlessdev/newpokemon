import { useEffect, useState } from "react";
import SelectOption from "../../components/shared/select-option";
import { useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { useDuelData } from "../../hooks/useDuel";

const OptionsInventary = ({ selectedIndex }) => {
  const { setSequence } = useDuelData();
  const navigate = useNavigate();
  const [selectIndexElement, setSelectIndexElement] = useState(0);
  const [selectIndexUse, setSelectIndexUse] = useState(0);
  const { isOpen, onToggle } = useToggle();
  const location = useLocation();
  const { someProp } = location.state || {};

  const InventaryList = [
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
              setSequence("capture");
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
  ];
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === "z") {
        const selectedOption =
          InventaryList[selectedIndex]?.options?.[selectIndexElement];
        if (isOpen) {
          const selectedUseOption =
            InventaryList?.[selectedIndex]?.useOptions?.[someProp]?.[
              selectIndexUse
            ];
          setSelectIndexUse(0);
          selectedUseOption?.action();
        } else {
          if (selectedOption?.action) {
            selectedOption.action();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectIndexUse, InventaryList]);

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
                  {isOpen && selectIndexElement === i && (
                    <SelectOption
                      className="absolute right-[-5%] bottom-[-12%]"
                      options={InventaryList?.[selectedIndex]?.useOptions?.[
                        someProp
                      ]?.map((useOpt) => useOpt.name)}
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
