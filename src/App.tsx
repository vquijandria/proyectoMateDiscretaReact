import { useState } from 'react'
import './App.css'

type Element = number | string;
type Relation = [Element, Element][];


function App() {
  const [elements, setElements] = useState<Element[]>([]);
  const [elementType, setElementType] = useState<"number" | "string">("number");
  const [generationType, setGenerationType] = useState<"random" | "manual">(
    "random"
  );
  const [newElement, setNewElement] = useState<Element>("");
  const [elementCount, setElementCount] = useState<number>(Math.floor(Math.random() * (7 - 4 + 1) + 4));
  const [relation, setRelation] = useState<[Element, Element][]>([]);

  const handleAddElement = () => {
    if (newElement !== "") {
      setElements([...elements, newElement]);
      setNewElement("");
    }
  };

  const handleGenerateElements = () => {
    let generatedElements: Element[] = [];

    if (generationType === "manual" && elements.length < elementCount) {
      alert(`You need to add ${elementCount - elements.length} more elements.`);
      return;
    }

    if (generationType === "random") {
      for (let i = 0; i < elementCount; i++) {
        let newElement: Element;
        do {
          newElement =
            elementType === "number"
              ? Math.floor(Math.random() * 100)
              : String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        } while (elements.includes(newElement));

        generatedElements.push(newElement);
      }
    } else {
      generatedElements = elements;
    }

    setElements(generatedElements);
  };

  const formatElements = (elements: Element[]) => {
    if (elements.length === 0) {
      return "{}";
    } else {
      return `{${elements.join(", ")}}`;
    }
  };

  const cartesianProduct = (set1: Element[], set2: Element[]) => {
    const result: [Element, Element][] = [];
    for (let i = 0; i < set1.length; i++) {
      for (let j = 0; j < set2.length; j++) {
        result.push([set1[i], set2[j]]);
      }
    }
    return result;
  };

  const formatCartesianProduct = (
    set1: Element[],
    set2: Element[],
    product: [Element, Element][]
  ) => {
    if (set1.length === 0 || set2.length === 0) {
      return "{}";
    } else {
      return `A × A = {${product
        .map((pair) => `(${pair[0]}, ${pair[1]})`)
        .join(", ")}}`;
    }
  };
   
  const generateRelation = () => {
    const relationSet: [Element, Element][] = [];
  
    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements.length; j++) {
        if (i !== j) {
          relationSet.push([elements[i], elements[j]]);
        }
      }
    }
  
    setRelation(relationSet);
  };

  
  
  return (
    <div>
      <div>
        <label>
          Tipo de elemento:
          <select
            value={elementType}
            onChange={(e) => setElementType(e.target.value as typeof elementType)}
          >
            <option value="number">Numeros</option>
            <option value="string">Letras</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Tipo de generacion:
          <select
            value={generationType}
            onChange={(e) =>
              setGenerationType(e.target.value as typeof generationType)
            }
          >
            <option value="random">Random</option>
            <option value="manual">Manual</option>
          </select>
        </label>
      </div>
      {generationType === "manual" && (
        <div>
          <label>
            New element:
            <input
              type={elementType === "number" ? "number" : "text"}
              value={newElement}
              onChange={(e) => setNewElement(e.target.value as typeof newElement)}
            />
          </label>
          <button onClick={handleAddElement}>Add</button>
        </div>
      )}

      <div>
        <button onClick={handleGenerateElements}>
          {generationType === "random" ? "Genera Conjunto" : "Update"}
        </button>
        
  <button onClick={generateRelation}>Genera Relacion</button>
      </div>

      <div>{`A = ${formatElements(elements)}`}</div>

      {elements.length >= 2 && (
        <div>{formatCartesianProduct(elements, elements, cartesianProduct(elements, elements))}</div>
      )}
      {elements.length >= 2 && (
  <div>
    
    <br />
    
    <br />
    {`Relacion = {${relation
      .map((pair) => `(${pair[0]}, ${pair[1]})`)
      .join(", ")}}`}
  </div>
)}

    </div>
    
  );
}

export default App;