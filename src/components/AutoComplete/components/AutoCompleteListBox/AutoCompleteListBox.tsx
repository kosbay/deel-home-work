import TextWithHighlight from "../TextWithHighlight/TextWithHighlight";

import styles from "./AutoCompleteListBox.module.scss";

interface AutoCompleteListBoxProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  isLoading: boolean;
  className?: string;
  searchValue: string;
}

const AutoCompleteListBox = <T extends { name: string }>({
  items, onSelect, isLoading, className, searchValue
}: AutoCompleteListBoxProps<T>) => {
  return (
    <ul className={`${styles.listBox} ${className}`}>
      { 
        (() => {
          if(isLoading) {
            return (
              <li className={styles.loader} />
            );
          } else if(items.length === 0) {
            return (
              <li className={styles.notFound}>
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