Frontend exercises for DEEL
Requirements:https://docs.google.com/document/d/1QnehXyWa4H6Dvkhho1GnB7rD255zwjBfp4YsPcsORv0/edit

Candidate: Kosbay Orynbasar

Linkedin:https://www.linkedin.com/in/orynbasar-kosbay/

Email: kosbay12@gmail.com


# Part 1

## How to run the project locally
### Install dependencies
Install the project dependencies by running the following command:

```bash
npm install
```

### Start the development server

To start the development server and run your React application, use the following command:

```bash
npm run dev
```

This will launch the development server, and you should see a message like "running at:" followed by the local development server URL (e.g., `http://localhost:3000`). Open this URL in your web browser to view your React application.

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



# Part 1

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

In React, both `Component` and `PureComponent` are base classes used for creating components. But they have difference on handling updates and rerenderings.

### Component

`Component` class default class for React components. When component is updated because of the changes in `props` or `state`, React will re-render the component and all the child components, whether the data has actually changed or not. This can cause potentially unnecessary re-renders and can affect performance of the app, especially when you have a lot of nested components, which we usually have in React.

### PureComponent

`PureComponent` class is an extension of `Component`. When component is updated, it will shallow compare the current and previous `props` and `state` before re-rendering the component. With `PureComponent` we can reduce the number of re-renders when component's data remains the same.

### Example where `PureComponent` might break your app:

```jsx
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  // Assume this component receives props: data and onClick

  handleClick = () => {
    // This click handler modifies the original data
    const { data, onClick } = this.props;
    data.name = 'John Doe';
    onClick(data);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>Hello, {data.name}</h1>
        <button onClick={this.handleClick}>Update Name</button>
      </div>
    );
  }
}
```

In this example, `MyComponent` is a `PureComponent` that receives a `data` prop and an `onClick` prop. When the button is clicked, the `handleClick` function modifies the `data` object by changing the `name` property.

Since `PureComponent` performs a shallow comparison of the props, it will not trigger a re-render if the `data` prop reference remains the same, even though the `name` property inside `data` has changed. As a result, the component will not update on the UI, and the new name will not be reflected.

To avoid this issue, you can use the regular `Component` instead of `PureComponent` in cases where you know that the `data` prop will be modified in place. This ensures that the component will always re-render and reflect the latest changes in the `data` prop.

This explanation highlights the key differences between `Component` and `PureComponent` and provides an example illustrating a scenario where using `PureComponent` might lead to unexpected behavior in your React application.


## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Combining Context with `shouldComponentUpdate` can lead to potential problems and unexpected behavior in a React application. Let's explore the reasons why this combination can be risky:

1. **Context Updates May Not Trigger Re-renders:** When you use `shouldComponentUpdate` to enhance component rendering, it compares the current and previous props and state. However, if the data from the Context changes and is used by a component as a prop, `shouldComponentUpdate` won't detect this change because Context itself doesn't trigger a re-render. Consequently, components may not update correctly when the Context data changes.

2. **Unpredictable Component Updates:** Context is intended to share data among components without the need for passing props. However, employing `shouldComponentUpdate` for rendering control might cause components to miss crucial updates from Context, leading to unpredictable behavior.

3. **Code Maintenance Complexity:** Combining `shouldComponentUpdate` with Context can increase code complexity, making it harder to maintain and understand. This added complexity might make it challenging for other developers to comprehend the data flow and re-rendering logic.

4. **Dependency on Context Implementation:** Using `shouldComponentUpdate` with Context assumes a specific way of implementing the Context provider and consumer. If the Context implementation changes or is replaced, it could break the component's rendering logic.

Instead of relying on `shouldComponentUpdate`, it's better to use React's built-in mechanisms for managing re-renders. React is optimized to handle component updates efficiently, and its Context API already provides a way to update components when Context data changes.

If you encounter performance issues related to Context updates, consider using the `useContext` hook (for functional components) or wrapping specific parts of your component tree with `React.memo` (for class components) to optimize rendering based on the Context data.


## 3. Describe 3 ways to pass information from a component to its PARENT

**1. Using Callback Functions:**

Child Component:
```jsx
import React from 'react';

const ChildComponent = ({ onInputChange }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Call the callback function provided by the parent
    onInputChange(inputValue);
  };

  return (
    <input type="text" onChange={handleInputChange} placeholder="Enter text" />
  );
};

export default ChildComponent;
```

Parent Component:
```jsx
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
    // Receive the input value from the child component
    setInputValue(value);
  };

  return (
    <div>
      <ChildComponent onInputChange={handleInputChange} />
      <p>Value from Child: {inputValue}</p>
    </div>
  );
};

export default ParentComponent;
```

**2. Through Props Drilling:**

Child Component:
```jsx
import React from 'react';

const ChildComponent = ({ data }) => {
  return (
    <div>
      {/* Use the data passed from the parent */}
      <p>{data}</p>
    </div>
  );
};

export default ChildComponent;
```

Parent Component:
```jsx
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const dataFromParent = "Hello from the parent!";

  return (
    <div>
      <ChildComponent data={dataFromParent} />
    </div>
  );
};

export default ParentComponent;
```

**3. Using Context API:**

Create a Context:
```jsx
import React from 'react';

const MyContext = React.createContext();

export default MyContext;
```

Parent Component:
```jsx
import React from 'react';
import ChildComponent from './ChildComponent';
import MyContext from './MyContext';

const ParentComponent = () => {
  return (
    <MyContext.Provider value="Hello from the parent!">
      <ChildComponent />
    </MyContext.Provider>
  );
};

export default ParentComponent;
```

Child Component:
```jsx
import React, { useContext } from 'react';
import MyContext from './MyContext';

const ChildComponent = () => {
  const dataFromContext = useContext(MyContext);

  return (
    <div>
      {/* Use the data from the context */}
      <p>{dataFromContext}</p>
    </div>
  );
};

export default ChildComponent;
```

In the first example, the child component uses a callback function provided by the parent to pass information. In the second example, data is passed down from the parent to the child through props drilling. In the third example, the parent provides data through the Context API, and the child consumes it using the `useContext` hook.


## 4. Give 2 ways to prevent components from re-rendering

1. **useMemo:**
   The `useMemo` trick helps you save time and avoid unnecessary work. Imagine you have a task that takes a long time to do, but you only need to do it when specific things change. So, with `useMemo`, you can remember the result of your work and only redo it when those specific things change. It's like keeping a note of your answer to a question and reusing it when the same question comes up again.

   For example, if you have a component that processes some data, you can use `useMemo` to remember the result of processing that data, and only do it again if the data changes. This can make your component run faster and smoother.

   ```jsx
   import React, { useMemo } from 'react';

   const MyComponent = ({ data }) => {
     const processedData = useMemo(() => {
       // Expensive data processing
       return processData(data);
     }, [data]);

     return <div>{processedData}</div>;
   };

   export default MyComponent;
   ```

2. **useCallback:**
   With `useCallback`, you can remember functions, just like you remember the result of your work with `useMemo`. Imagine you have a special dance move that you only want to show when your friend calls you. You don't want to create a new dance move every time they call; you want to remember the same move and use it again and again. That's what `useCallback` does for functions in React.

   For example, if you have a component that has a callback function, like handling a button click, you can use `useCallback` to remember that function. It ensures that the same function is used and not recreated each time the component renders, making your app more efficient.

   ```jsx
   import React, { useCallback } from 'react';

   const MyComponent = ({ onClick }) => {
     const handleClick = useCallback(() => {
       // Handle click logic
       onClick();
     }, [onClick]);

     return <button onClick={handleClick}>Click me</button>;
   };

   export default MyComponent;
   ```

Both `useMemo` and `useCallback` are great tools to make your React components faster and smoother by avoiding unnecessary work and function re-creation. They're like helpful notes and dance moves that save time and energy in your app!


## 5. What is a fragment and why do we need it? Give an example where it might break my app. 

In React, a fragment is like a helpful wrapper that allows us to group multiple elements together without adding an extra DOM element. It's like a container that doesn't affect the structure of our HTML but helps us organize our components better.

**Why We Need Fragments:**

When we create components in React, we usually return a single element, like a `<div>`, to wrap all the other elements. But sometimes, this extra wrapping element is not necessary needed in the HTML structure and can **BREAK** UI of your components. Fragments come to the rescue here, allowing us to group elements without introducing unnecessary nesting in the DOM.

**Example Where It Might Break Your App:**

Imagine you have a component that should only render one child element, like a list item. But without using a fragment, you wrap it with a `<div>` by habit. In this case, your app will have extra DOM elements that might interfere with the styling or layout, causing unexpected issues.

```jsx
// Without Fragments (might break the app)
const MyComponent = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};
```

Using a fragment, we can avoid the extra `<div>` wrapper:

```jsx
// With Fragments (better and won't break the app)
const MyComponent = () => {
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  );
};
```

By using fragments, we keep our component structure clean and prevent unnecessary DOM elements that could lead to unintended consequences.


## 6. Give 3 examples of the HOC pattern.

The Higher-Order Component (HOC) pattern is a design technique used in React to enhance and extend component functionality. It involves wrapping a component with another component to provide additional features or data.

1. **Authentication HOC:**
   An authentication HOC is used to protect certain components from being accessed by unauthenticated users. It wraps the target component with authentication logic, checking if the user is logged in before rendering the component. If the user is not authenticated, the HOC can redirect them to a login page or display an appropriate message.

2. **Logging HOC:**
   A logging HOC is used to log events or actions that occur within a component. It wraps the target component and adds logging functionality to track user interactions, state changes, or errors. This can be helpful for debugging and monitoring user behavior in the application.

3. **Styling HOC:**
   A styling HOC is used to apply consistent styles to multiple components. It wraps the target components and injects common styles or theme data. This way, you can manage the visual appearance of components centrally and make it easier to maintain a cohesive design throughout the application.

In each of these examples, the HOC pattern enables code reuse and separation of concerns. By wrapping components with higher-order components, we can add specialized functionality without modifying the original components directly.


## 7. What's the difference in handling exceptions in promises, callbacks and async...await.

1. **Promises:**
   - In promises, you deal with exceptions using the `.catch()` method attached to the promise chain. If something goes wrong during the promise execution, the code jumps to the nearest `.catch()` block in the chain to handle the error.
   - You can also use a second argument to the `.then()` method to handle specific errors for that promise.
   - With promises, you need to use `.catch()` explicitly to manage errors, and if you don't handle rejections, the program might have uncaught issues.

   Example:
   ```js
   fetchData()
     .then((data) => {
       // Handle when things go well
     })
     .catch((error) => {
       // Handle errors
     });
   ```

2. **Callbacks:**
   - Callbacks use a traditional way of handling errors, where the first argument of the callback function is reserved for errors (if any), and the other arguments carry the data.
   - You have to manually check for errors within the callback function and respond appropriately. There isn't an automatic error handling feature like `.catch()` in promises.

   Example:
   ```js
   fetchData((error, data) => {
     if (error) {
       // Handle errors
     } else {
       // Handle when things go well
     }
   });
   ```

3. **Async/Await:**
   - Async/await gives a more straightforward and synchronous-looking way to handle exceptions in asynchronous operations.
   - You use the `try...catch` block to catch exceptions inside the `async` function. If an error occurs within the `try` block, the code goes to the `catch` block, allowing you to manage the error smoothly.
   - The `async` function automatically returns a promise, and any error within it causes the promise to be rejected with the error.

   Example:
   ```js
   async function fetchData() {
     try {
       const data = await fetchDataAsync();
       // Handle when things go well
     } catch (error) {
       // Handle errors
     }
   }
   ```

In summary, promises use `.catch()` to handle exceptions, callbacks need manual error checking within the callback, and async/await relies on `try...catch` blocks for a more readable way of managing errors in asynchronous code. Async/await provides a cleaner approach to handle exceptions compared to callbacks and promises.


## 8. How many arguments does setState take and why is it async.

setState takes one or two arguments. The first argument is an object that represents the new state you want to set for the component. The second argument, which is optional, is a callback function that will be executed after the state has been updated.

setState is asynchronous because when you call it, React queues up the state updates and processes them in batches to improve performance. This means that the state updates might not happen immediately after calling setState. Instead, React waits for the right time to update the state to ensure efficiency and avoid unnecessary re-renders of the component. This batching mechanism helps to prevent excessive rendering and ensures that the component's state is updated in an optimized way.


## 9. List the steps needed to migrate a Class to Function Component. 

1. **Step 1 - Identify the Class Component:**
   First, find the Class Component that you want to convert to a Function Component. This is the component that you will be working on.

2. **Step 2 - Copy the Component Code:**
   Copy the entire code of the Class Component that you want to migrate. This will include the component's name, state, lifecycle methods, and other functionalities.

3. **Step 3 - Remove Class Syntax and Extends:**
   In the copied code, remove the `class` keyword and the `extends React.Component` part. Function Components don't use the class syntax.

4. **Step 4 - Add Function Keyword:**
   Replace the `class` keyword with the `function` keyword to define the Function Component. Also, remove the constructor and any lifecycle methods, as they are not used in Function Components.

5. **Step 5 - Remove this.state and setState:**
   In Function Components, you won't use `this.state` or `setState` to manage state. Instead, you'll use the `useState` hook to create and update state variables.

6. **Step 6 - Convert Lifecycle Methods:**
   If the Class Component contains lifecycle methods (e.g., `componentDidMount`, `componentDidUpdate`, etc.), you'll need to replace them with the corresponding hooks in the Function Component (e.g., `useEffect`).

7. **Step 7 - Remove render() Method:**
   Since Function Components don't have a `render()` method, remove the `render()` function from the code.

8. **Step 8 - Add Return Statement:**
   In the Function Component, add a `return` statement to define what the component should render. This is similar to what was inside the `render()` method in the Class Component.

9. **Step 9 - Update Props and Event Handlers:**
   Ensure that any references to `this.props` in the Class Component are replaced with just `props` in the Function Component. Similarly, update event handlers to use the function directly without using `this`.

10. **Step 10 - Test and Debug:**
    Once you have completed the migration, test your Function Component thoroughly to ensure that it behaves as expected. Debug any issues that may arise during the migration process.


## 10. List the steps needed to migrate a Class to Function Component. 

1. **Inline Styles:**
   Inline styles allow you to define styles directly within the component's JSX code using the `style` attribute. You pass an object with CSS property-value pairs to apply specific styles to the component.

2. **CSS Modules:**
   CSS Modules is an approach that allows you to write CSS files alongside your components. The CSS rules are locally scoped, meaning they only apply to the specific component they are imported into.

3. **CSS-in-JS Libraries:**
   CSS-in-JS libraries, like Styled-components or Emotion, enable you to write CSS styles using JavaScript directly within your components. These libraries generate unique class names for styles, ensuring that they are isolated to specific components.

4. **CSS Frameworks:**
   You can use popular CSS frameworks like Bootstrap or Material-UI, which provide pre-designed components and styles that you can easily integrate into your React application.

5. **Global Styles:**
   Global styles are CSS rules that apply to the entire application. You can include a global CSS file or use a CSS-in-JS library's global style feature to apply styles that affect the entire app.


## 11. List the steps needed to migrate a Class to Function Component. 

**How to Display HTML Content from the Server in React:**

If you receive an HTML string from the server and want to show it as part of your React application, you can use the `dangerouslySetInnerHTML` prop in React. This prop allows you to render the HTML content safely and avoid potential security issues.

Here are the steps:

1. Receive the HTML String:
   First, get the HTML string from the server through an API request or any other means of data fetching.

2. Use `dangerouslySetInnerHTML`:
   To render the HTML string in your React component, set the `dangerouslySetInnerHTML` prop on the element where you want to display the HTML content. Pass an object with a `__html` key containing the HTML string as the prop value.

Example:
```jsx
import React from 'react';

const MyComponent = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default MyComponent;
```

