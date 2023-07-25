# Part 1
## AutoComplete Component

The `AutoComplete` component is a reusable React component that provides an autocomplete functionality for search inputs. It allows users to input text, and it will display a list of suggestions based on the user's input. The suggestions are fetched from a provided search query function, and the component provides a debounced search to optimize API calls.

### Props

The `AutoComplete` component accepts the following props:

- `searchQuery` (required): A function that takes the user's input as a string and fetches the suggestions. It should have the following signature: `(query: string, setResults: (value: YourItemType[]) => void, setIsLoading: (value: boolean) => void) => void`.
- `onResultClick`: An optional callback function that will be called when the user clicks on a suggestion item. It has the following signature: `(item: YourItemType) => void`.
- `placeholder`: An optional string to set the placeholder text for the search input.
- `classNames`: An optional object to customize the styling of the `AutoComplete` component and its child components. It contains the following properties:
  - `autoComplete`: Custom class name for the `AutoComplete` component.
  - `listBox`: Custom class name for the suggestions list box.
  - `loader`: Custom class name for the loader element when fetching suggestions.
  - `notFound`: Custom class name for the element displayed when no suggestions are found.
  - `input`: Custom class name for the search input.
  - `listBoxItem`: Custom class name for each suggestion item in the list.

---

Please note that in the above documentation, replace `YourItemType` with the type of items you expect in the suggestions list.

### Example

Example of how to use `AutoComplete` is shown on `App` component.
In the example the App component utilizes the AutoComplete component to enable users to discover animals. The searchQuery function is passed as a prop to the AutoComplete component to fetch animal data based on the user's input. When the user clicks on a suggestion item, the details of the selected animal will be displayed below the search input.
