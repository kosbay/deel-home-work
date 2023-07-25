import TextWithHighlight from "../TextWithHighlight/TextWithHighlight";

import styles from "./AutoCompleteListBox.module.scss";

interface AutoCompleteListBoxProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  isLoading: boolean;
  searchValue: string;
  classNames?: {
    listBox?: string;
    loader?: string;
    notFound?: string;
    listBoxItem?: string;
  };
}

const AutoCompleteListBox = <T extends { name: string }>({
  items, onSelect, isLoading, classNames, searchValue
}: AutoCompleteListBoxProps<T>) => {
  return (
    <ul className={`${styles.listBox} ${classNames?.listBox}`}>
      { 
        (() => {
          if(isLoading) {
            return (
              <li className={`${styles.loader} ${classNames?.loader}`} />
            );
          } else if(items.length === 0) {
            return (
              <li className={`${styles.notFound} ${classNames?.notFound}`}>
                Not found
              </li>
            )
          } else if(items.length > 0) {
            return (
              <>
                {items.map((item, index) => (
                  <li
                    key={item.name + index}
                    onClick={() => onSelect(item)}
                    className={classNames?.listBoxItem}
                  >
                    <TextWithHighlight text={item.name} stringToHighlight={searchValue} />
                  </li>
                ))}
              </>
            )
          } else {
            return null
          }
        })()
      }
    </ul>
  );
};

export default AutoCompleteListBox;