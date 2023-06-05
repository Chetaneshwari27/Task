import React, { useState } from 'react';
import styled from 'styled-components';


const TodoListWrapper = styled.div`
    padding: 15px;
    background-color: #efefef;
    color: #000000;
    height: 100vh
`;

const TodoListHeading = styled.h1`
    color: #ff0000;
    margin: 0px 0px 15px 0px;
    font-size: 20px
`;

const TodoInput = styled.input`
    padding: 5px 15px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #eee;
    width: 100%;
    margin-bottom: 20px;
`;

const TodoListItems = styled.div`
    background-color: #ffffff;
    padding: 5px 15px;
`;

const ListItem = styled.div` 
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DeleteButton = styled.button` 
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

const DoneButton = styled.button` 
    background-color: #00ff00;
    color: #000000;
    border: none;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
`;
const LIST = styled.li`
    listStyle:"none";
    text-decoration: "line-through";
`;

const Button = styled.button`
  display:inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

// Listing Component
const ListingRenderer = ({ items, onDelete, onDone }) => {
    return <TodoListItems>
        {items && items.map((item, index) => {
            return <ListItem key={`item_${index}`}>
                {item.done ?
                    <del>{item.title}</del>
                    :
                    <span>{item.title}</span>
                }
                <span>
                    <DoneButton onClick={() => onDone && onDone(item.id)}>{item.done ? "☑" : "☐"}</DoneButton>
                    <DeleteButton onClick={() => onDelete && onDelete(item.id)}>&times;</DeleteButton>
                </span>
            </ListItem>
        })}
    </TodoListItems>
}



// Input Component
const ListInputRenderer = () => {
    return <>
        <TodoInput />
    </>
}

// Input Component
const HeadingRenderer = ({ title, count }) => {
    return <TodoListHeading>
        {title} <span>({count})</span>
    </TodoListHeading>
}

// Main Wrapper Component

const dummyItems = [{
    id: 1,
    title: "Item 1",
    done: true,
},
{
    id: 2,
    title: "Item 2",
    done: false,
}]

const TodoList = () => {
    const [items, setItems] = useState(dummyItems);
    const [newItem, setNewItem] = useState('');
  
    const handleAddItem = () => {
      if (newItem.trim() !== '') {
        const newItemObject = {
          id: Date.now(),
          title: newItem,
          done: false,
        };
  
        setItems([...items, newItemObject]);
        setNewItem('');
      }
    };
  
    const handleDeleteItem = (itemId) => {
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    };
  
    const handleToggleDone = (itemId) => {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, done: !item.done };
        }
        return item;
      });
  
      setItems(updatedItems);
    };

    return (
        <TodoListWrapper>
      <HeadingRenderer title="My Todo List" count={items.length} />
      <TodoInput
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <AddButton onClick={handleAddItem}>Add</AddButton>
      <ListingRenderer
        items={items}
        onDelete={handleDeleteItem}
        onDone={handleToggleDone}
      />
    </TodoListWrapper>
    )
}

export default TodoList;