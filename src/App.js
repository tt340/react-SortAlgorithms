import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const myref = useRef(null);
  const [dataCount, setDataCount] = useState(100);
  const [withTimeout, setWithTimeout] = useState(true);

  const WAITING_TIME = 10; // in ms

  useEffect(() => {
    generateRandomArray(dataCount, 100);
  }, [dataCount]);

  const generateRandomArray = (count, max) => {
    var randomData = [];
    for (var i = 0; i < count; i++) {
      randomData.push(Math.round(Math.random() * max));
    }
    setData(randomData);
  };

  const displayDataArray = () => {
    if (myref.current) {
      const displayWidth = myref.current.offsetWidth;
      const displayHeight = myref.current.offsetHeight;
      const itemWidth = Math.floor(displayWidth / data.length);

      return data.map((item) => {
        const currentHeight = item * 0.01 * displayHeight;
        return (
          <div
            style={{
              height: `${currentHeight}px`,
              width: `${itemWidth}px`,
              backgroundColor: "blue",
              display: "inline-block",
              boxSizing: "border-box",
            }}></div>
        );
      });
    }
  };

  const doBubbleSort = () => {
    bubbleSort(data);
  };

  const bubbleSort = async (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      let swapped = false;

      for (let j = 0; j < array.length - i; j++) {
        if (array[j] > array[j + 1]) {
          array = await swapItems(array, j, j + 1);
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
    }
  };

  const doSelectionSort = () => {
    selectionSort(data, data.length);
  };

  // array = list to sort, n = lenght of list
  const selectionSort = async (array, n) => {
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      // check minimum element
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[min]) {
          min = j;
        }
      }
      if (min != i) {
        array = await swapItems(array, min, i);
      }
    }
  };

  const doMergeSort = () => {
    let sorted = mergeSort(data, 0, data.length - 1);
    setData(sorted);
  };

  const merge = (left, right) => {
    let array = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) array.push(left.shift());
      else array.push(right.shift());
    }
    return array.concat(left.slice().concat(right.slice()));
  };
  const mergeSort = (array) => {
    const middle = Math.round(array.length / 2);

    if (array.length < 2) return array;

    const left = array.slice(0, middle);
    const right = array.slice(middle);
    // await updateDataAndWait([...left, ...right]);
    return merge(mergeSort(left), mergeSort(right));
  };

  const updateDataAndWait = async (data) => {
    setData([...data]);
    await new Promise((r) => setTimeout(r, WAITING_TIME));
  };

  const doQuickSort = () => {
    const array = [...data];
    quickSort(array, 0, data.length - 1);
  };

  const quickSort = async (array, low, high) => {
    if (low < high) {
      let pivot = await partition(array, low, high);
      quickSort(array, low, pivot - 1);
      quickSort(array, pivot + 1, high);
    }
  };

  const partition = async (array, low, high) => {
    const pivot = array[high];
    let index = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (array[j] < pivot) {
        index++;
        array = await swapItems(array, index, j);
      }
    }
    array = await swapItems(array, index + 1, high);
    return index + 1;
  };

  const swapItems = async (array, i, j) => {
    const tempi = array[i];
    array[i] = array[j];
    array[j] = tempi;
    if (withTimeout)
      await updateDataAndWait([...array]);
    setData([...array]);

    return array;
  };
  return (
    <div className="App">
      {/* Display Data */}
      <div style={{ width: "100%", height: "80%", display: "inline-block" }} ref={myref}>
        {displayDataArray()}
      </div>
      <div>
        <button
          onClick={() => {
            doQuickSort();
          }}>
          QuickSort
        </button>
        <button
          onClick={() => {
            doSelectionSort();
          }}>
          Selection Sort
        </button>
        <button
          onClick={() => {
            doBubbleSort();
          }}>
          Bubble Sort
        </button>
        <button
          onClick={() => {
            doMergeSort();
          }}>
          Merge Sort
        </button>
        <button
          onClick={() => {
            generateRandomArray(dataCount, 100);
          }}>
          Reload Data
        </button>
      </div>
      <div>
        number of items:
        <input
          type="number"
          title="Count of data"
          onChange={(e) => {
            setDataCount(e.target.value);
          }}
          value={dataCount}
        />
        sort with timeout each change:
        <input
          type="checkbox"
          checked={withTimeout}
          onChange={(e) => {
            console.log(e.target.checked);
            setWithTimeout(e.target.checked);
          }}
        />
      </div>
    </div>
  );
}

export default App;
